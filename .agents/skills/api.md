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

| Method | Ý nghĩa | Mô tả |
|--------|---------|-------|
| **GET** | Lấy dữ liệu | Đọc dữ liệu từ resource, không làm thay đổi dữ liệu trên server. |
| **POST** | Tạo mới | Tạo một resource mới hoặc thực hiện một tác vụ nghiệp vụ đặc biệt (như gửi lệnh). |
| **PUT** | Cập nhật toàn bộ | Thay thế toàn bộ resource hiện tại bằng một payload mới. |
| **PATCH** | Cập nhật một phần | Chỉ sửa đổi một số trường cụ thể của resource mà không ghi đè toàn bộ. |
| **DELETE** | Xóa | Loại bỏ resource khỏi server. |

---

## GraphQL Operations & RESTful Comparison

Ở cấp độ Senior, AI Agent cần nắm vững sự khác biệt giữa kiến trúc RESTful và GraphQL để tích hợp và thiết kế các hàm gọi API tối ưu:

### 1. GraphQL Operations

| Operation | Ý nghĩa | Tương đương trong REST |
|-----------|---------|-------------------------|
| **Query** | Lấy dữ liệu | `GET` |
| **Mutation** | Thêm, sửa, xóa dữ liệu | `POST`, `PUT`, `PATCH`, `DELETE` |
| **Subscription** | Nhận dữ liệu thời gian thực qua WebSockets | Server-Sent Events (SSE) / WebSockets |

### 2. Bảng So Sánh RESTful vs GraphQL (Senior Level)

| Đặc tính | RESTful API | GraphQL |
|---|---|---|
| **Endpoint** | Nhiều endpoints theo tài nguyên (e.g. `/users`, `/posts`) | Một endpoint duy nhất (thường là `/graphql`) |
| **Dữ liệu trả về** | Cố định bởi server (Dễ gặp Over-fetching hoặc Under-fetching) | Tùy biến bởi client thông qua Query Schema |
| **HTTP Status Code** | Sử dụng đầy đủ mã lỗi HTTP (200, 400, 401, 403, 404, 500) | Luôn trả về `200 OK` kể cả khi có lỗi (lỗi nằm trong mảng `errors` của response body) |
| **Error Handling** | Dựa vào HTTP status code để xử lý logic | Phải parse response body để tìm mảng `errors` trước khi xử lý |
| **Caching** | Caching mặc định tốt ở tầng Network (HTTP caching) | Caching phức tạp hơn, chủ yếu ở tầng Client (như Apollo Client, Relay) |

---

## Các Khái niệm API Nâng cao (Senior Level)

Để xây dựng một hệ thống API chuẩn Production, AI Agent và lập trình viên Senior cần nằm lòng và áp dụng các khái niệm kiến trúc sau:

### 1. API Security (Bảo mật API)
*   **CORS (Cross-Origin Resource Sharing)**: Cấu hình chính xác whitelist các domain được phép truy cập API ở môi trường Production. Không bao giờ cấu hình `Access-Control-Allow-Origin: *` cho các API có chứa thông tin nhạy cảm hoặc yêu cầu authentication.
*   **Rate Limiting**: Giới hạn số lượng request từ một IP/Token trong một khoảng thời gian (ví dụ: dùng thuật toán *Token Bucket* hoặc *Leaky Bucket*). Bảo vệ hệ thống khỏi các cuộc tấn công DDoS, Brute Force và cào dữ liệu (scraping).
*   **CSRF (Cross-Site Request Forgery)**: Chống giả mạo yêu cầu từ trang web lạ bằng cách sử dụng các thuộc tính cookie bảo mật (`SameSite=Strict/Lax`, `Secure`, `HttpOnly`) kết hợp với việc kiểm tra `CSRF Token` hoặc kiểm tra header `Origin`/`Referer`.
*   **Data Validation**: Luôn thực hiện xác thực và làm sạch dữ liệu (sanitize) ở cả 2 đầu: Client-side (cho trải nghiệm người dùng nhanh) và Server-side (cho an toàn hệ thống thực tế). Sử dụng các công cụ như `Zod`, `Joi`, hay `class-validator` để định nghĩa schemas chặt chẽ.

### 2. OpenAPI / Swagger (Tài liệu hóa API)
*   Sử dụng đặc tả **OpenAPI Specification (OAS)** để mô tả toàn bộ cấu trúc API (Endpoints, Request Body, Response, Security).
*   Giúp tạo ra giao diện kiểm thử trực quan tự động (Swagger UI) và hỗ trợ sinh mã nguồn client-side tự động (SDK generation) cho các ngôn ngữ khác nhau, giảm thiểu rủi ro sai lệch kiểu dữ liệu (type mismatch).

### 3. N+1 Query và DataLoader
*   **Vấn đề N+1**: Xảy ra khi một truy vấn chính lấy ra $N$ bản ghi, sau đó với mỗi bản ghi hệ thống lại thực hiện thêm 1 truy vấn phụ để lấy dữ liệu liên quan (tổng cộng $N+1$ truy vấn), gây quá tải cơ sở dữ liệu.
*   **DataLoader**: Giải pháp giải quyết N+1 (phổ biến trong GraphQL và REST) bằng cách gom nhóm (batching) và bộ nhớ đệm (caching) các yêu cầu truy vấn lại thành một câu lệnh SQL duy nhất (ví dụ: dùng lệnh `IN` trong SQL: `SELECT * FROM table WHERE id IN (...)`).

### 4. GraphQL Schema & Resolver
*   **Schema (Type Definitions)**: Định nghĩa hợp đồng dữ liệu giữa Client và Server sử dụng ngôn ngữ SDL (Schema Definition Language). Cho phép hệ thống tự động kiểm tra cú pháp và kiểu dữ liệu trước khi thực thi.
*   **Resolver**: Các hàm xử lý nghiệp vụ thực tế tương ứng với từng trường (field) trong Schema. Resolver chịu trách nhiệm lấy dữ liệu từ database, cache, hoặc gọi microservice khác để trả về giá trị khớp với Schema định nghĩa.

### 5. JWT Authentication (Xác thực với JSON Web Token)
*   **Access Token**: Thời hạn ngắn (5-15 phút), lưu trong memory (State của ứng dụng) để thực hiện gọi API nhanh.
*   **Refresh Token**: Thời hạn dài (vài ngày/tuần), lưu an toàn trong cookie bảo mật `HttpOnly` và `Secure`. Được dùng để yêu cầu cấp Access Token mới khi token cũ hết hạn.
*   **Token Rotation**: Cơ chế xoay vòng Refresh Token liên tục để phát hiện và ngăn chặn hành vi đánh cắp token.

### 6. Phân trang dữ liệu: Offset vs Cursor Pagination
*   **Offset Pagination (`LIMIT / OFFSET`)**:
    *   *Cách dùng*: Dựa trên số trang (page) và số phần tử trên trang (limit).
    *   *Ưu điểm*: Dễ code, nhảy trang tùy ý nhanh.
    *   *Nhược điểm*: Chậm trên các tập dữ liệu cực lớn (database vẫn phải quét qua toàn bộ dòng bị bỏ qua); Dễ bị trùng hoặc mất dữ liệu khi có bản ghi mới chèn vào giữa lúc người dùng đang chuyển trang.
*   **Cursor Pagination (`WHERE cursor > last_id LIMIT`)**:
    *   *Cách dùng*: Dựa trên con trỏ (thường là ID tăng dần hoặc mốc thời gian của phần tử cuối cùng của trang trước).
    *   *Ưu điểm*: Tốc độ truy vấn siêu nhanh và ổn định (luôn dùng chỉ mục Index); Không bị trùng lặp dữ liệu khi có record mới chèn vào. Rất phù hợp với tính năng cuộn vô hạn (Infinite Scroll).
    *   *Nhược điểm*: Không hỗ trợ tính năng nhảy đến một trang bất kỳ.

### 7. API Versioning (Quản lý phiên bản API)
Đảm bảo tính tương thích ngược (backward compatibility) khi cập nhật API:
*   **URI Versioning**: Phiên bản nằm trong đường dẫn (e.g. `/api/v1/users`).
*   **Header Versioning**: Gửi phiên bản qua custom header (e.g. `X-API-Version: 1.0`).
*   **Accept Header (Media Type) Versioning**: Chỉ định phiên bản qua header Accept (e.g. `Accept: application/vnd.myapi.v1+json`).

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
