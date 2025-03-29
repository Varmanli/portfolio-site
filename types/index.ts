// General types used across the application
export interface BaseResponse {
  success: boolean;
  message: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
}

export interface ApiError {
  code: string;
  message: string;
  field?: string;
}
