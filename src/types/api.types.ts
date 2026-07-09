export interface ApiResponse<TData = unknown> {
  ok: boolean;
  data?: TData;
  error?: string;
  message?: string;
}

export interface ApiError {
  name: 'ApiError';
  statusCode: number;
  message: string;
  responseBody?: unknown;
}

export const createApiError = (
  statusCode: number,
  message: string,
  responseBody?: unknown,
): ApiError => ({ name: 'ApiError', statusCode, message, responseBody });

export const isApiError = (err: unknown): err is ApiError =>
  typeof err === 'object' && err !== null && (err as ApiError).name === 'ApiError';

export const isClientError = (error: ApiError): boolean =>
  error.statusCode >= 400 && error.statusCode < 500;

export const isServerError = (error: ApiError): boolean =>
  error.statusCode >= 500;

export const getErrorMessage = (error: unknown): string => {
  if (isApiError(error)) return error.message;
  if (error instanceof Error) return error.message;
  return String(error);
};

export const mapStatusCodeToMessage = (statusCode: number): string => {
  const messages: Record<number, string> = {
    400: 'Yêu cầu không hợp lệ.',
    401: 'Chưa xác thực — kiểm tra API Code.',
    403: 'Không có quyền truy cập.',
    404: 'Không tìm thấy resource.',
    409: 'Vòng lặp đào đang chạy. Dừng trước khi bắt đầu lại.',
    422: 'Dữ liệu không hợp lệ.',
    500: 'Lỗi server nội bộ.',
  };
  return messages[statusCode] ?? `Lỗi HTTP ${statusCode}.`;
};
