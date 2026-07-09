# Skill: RESTful API & HTTP Status Codes

## Mô tả
Hướng dẫn AI Agent xử lý HTTP responses đúng chuẩn trong tầng **Services** (`src/services/`), bao gồm các status codes, error handling và TypeScript types cho API.

---

## HTTP Status Code Reference

| Code | Tên | Ý nghĩa | Hành động trên Frontend |
|------|-----|---------|------------------------|
| `200` | **OK** | Yêu cầu thành công, có data trả về | Cập nhật UI với data |
| `201` | **Created** | Tạo resource mới thành công | Thông báo thành công, cập nhật danh sách |
| `204` | **No Content** | Thành công nhưng không có data trả về | Cập nhật UI (xóa item, reset form) |
| `400` | **Bad Request** | Request sai cú pháp hoặc thiếu field | Hiển thị lỗi validation cho user |
| `401` | **Unauthorized** | Chưa xác thực (thiếu hoặc sai token) | Redirect đến trang login |
| `403` | **Forbidden** | Đã xác thực nhưng không có quyền | Hiển thị thông báo "Không có quyền truy cập" |
| `404` | **Not Found** | Resource không tồn tại | Hiển thị trang 404 hoặc thông báo không tìm thấy |
| `409` | **Conflict** | Xung đột state (ví dụ: đào đang chạy) | Thông báo conflict cụ thể, đề xuất giải pháp |
| `422` | **Validation Error** | Dữ liệu không hợp lệ về mặt business | Hiển thị lỗi chi tiết từng field |
| `500` | **Internal Server Error** | Lỗi phía server | Hiển thị thông báo lỗi chung, ghi log |

---

## RESTful HTTP Methods Reference

| Method | Ý nghĩa | Tần suất sử dụng | Mô tả |
|--------|---------|------------------|-------|
| **GET** | Lấy dữ liệu | ⭐⭐⭐⭐⭐ | Đọc dữ liệu từ resource, không làm thay đổi dữ liệu trên server. |
| **POST** | Tạo mới | ⭐⭐⭐⭐⭐ | Tạo một resource mới hoặc thực hiện một tác vụ nghiệp vụ đặc biệt (như gửi lệnh). |
| **PUT** | Cập nhật toàn bộ | ⭐⭐ | Thay thế toàn bộ resource hiện tại bằng một payload mới. |
| **PATCH** | Cập nhật một phần | ⭐⭐⭐⭐⭐ | Chỉ sửa đổi một số trường cụ thể của resource mà không ghi đè toàn bộ. |
| **DELETE** | Xóa | ⭐⭐⭐⭐ | Loại bỏ resource khỏi server. |

---

## TypeScript Types cho API Layer

```typescript
// src/types/api.types.ts

/** Chuẩn response envelope cho tất cả API calls */
export interface ApiResponse<TData = unknown> {
  ok: boolean;
  data?: TData;
  error?: string;
  message?: string;
}

/** Lỗi HTTP có status code kèm theo */
export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly responseBody?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/** Type guard: phân biệt lỗi 4xx (client) vs 5xx (server) */
export const isClientError = (error: ApiError): boolean =>
  error.statusCode >= 400 && error.statusCode < 500;

export const isServerError = (error: ApiError): boolean =>
  error.statusCode >= 500;
```

---

## Service Layer Pattern

```typescript
// src/services/minerService.ts

import type { ApiResponse, MinerStatus } from '@/types';
import { ApiError } from '@/types/api.types';
import { API_BASE_URL } from '@/config/constants';

const request = async <TData>(
  endpoint: string,
  options?: RequestInit,
): Promise<ApiResponse<TData>> => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  // 204 No Content — không có body để parse
  if (response.status === 204) {
    return { ok: true };
  }

  const body = await response.json();

  if (!response.ok) {
    throw new ApiError(response.status, body?.error ?? 'api_error', body);
  }

  return { ok: true, data: body.data ?? body };
};

export const minerService = {
  getStatus: () =>
    request<MinerStatus>('/tool/get_managed_mining_status', { method: 'POST' }),

  startMining: (apiCode: string) =>
    request<MinerStatus>('/tool/start_managed_mining_loop', {
      method: 'POST',
      body: JSON.stringify({ apiCode }),
    }),

  stopMining: () =>
    request<MinerStatus>('/tool/stop_managed_mining_loop', { method: 'POST' }),
};
```

---

## Error Handling trong Custom Hook

```typescript
// src/hooks/useMinerStatus.ts

import { useState, useEffect, useCallback } from 'react';
import { minerService } from '@/services/minerService';
import { ApiError, isClientError } from '@/types/api.types';
import type { MinerStatus } from '@/types';

interface UseMinerStatusReturn {
  status: MinerStatus | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useMinerStatus = (): UseMinerStatusReturn => {
  const [status, setStatus] = useState<MinerStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await minerService.getStatus();
      setStatus(response.data ?? null);
    } catch (err) {
      if (err instanceof ApiError) {
        // 4xx: Lỗi do client → hiển thị message cụ thể
        if (isClientError(err)) {
          setError(mapStatusCodeToMessage(err.statusCode));
          return;
        }
        // 5xx: Lỗi server → thông báo chung
        setError('Lỗi server, vui lòng thử lại sau.');
        return;
      }
      // Lỗi mạng (không có internet, server tắt)
      setError('Không thể kết nối đến server. Kiểm tra lại backend.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchStatus();
  }, [fetchStatus]);

  return { status, isLoading, error, refetch: fetchStatus };
};

// Utility: map status code sang message thân thiện
const mapStatusCodeToMessage = (statusCode: number): string => {
  const messages: Record<number, string> = {
    400: 'Yêu cầu không hợp lệ. Vui lòng kiểm tra lại thông tin.',
    401: 'Phiên đăng nhập hết hạn. Vui lòng xác thực lại.',
    403: 'Bạn không có quyền thực hiện hành động này.',
    404: 'Không tìm thấy tài nguyên yêu cầu.',
    409: 'Vòng lặp đào đang chạy. Dừng vòng lặp hiện tại trước.',
    422: 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.',
  };
  return messages[statusCode] ?? `Lỗi không xác định (${statusCode}).`;
};
```

---

## GraphQL Considerations
GraphQL luôn trả về `200 OK` ngay cả khi có lỗi. Lỗi được đặt trong trường `errors` của response body:

```typescript
// src/types/api.types.ts — thêm cho GraphQL nếu dùng

export interface GraphQLError {
  message: string;
  extensions?: { code: string; statusCode?: number };
}

export interface GraphQLResponse<TData> {
  data?: TData;
  errors?: GraphQLError[];
}

// Kiểm tra lỗi trong GraphQL response
export const hasGraphQLErrors = <TData>(
  res: GraphQLResponse<TData>,
): res is GraphQLResponse<TData> & { errors: GraphQLError[] } =>
  Array.isArray(res.errors) && res.errors.length > 0;
```
