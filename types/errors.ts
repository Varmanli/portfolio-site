/**
 * Base error class for application errors
 */
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number = 500
  ) {
    super(message);
    this.name = "AppError";
  }
}

/**
 * Error for API related issues
 */
export class ApiError extends AppError {
  constructor(message: string, status: number = 500) {
    super(message, "API_ERROR", status);
    this.name = "ApiError";
  }
}

/**
 * Error for validation issues
 */
export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR", 400);
    this.name = "ValidationError";
  }
}

/**
 * Error for authentication issues
 */
export class AuthError extends AppError {
  constructor(message: string) {
    super(message, "AUTH_ERROR", 401);
    this.name = "AuthError";
  }
}

/**
 * Error for authorization issues
 */
export class AuthorizationError extends AppError {
  constructor(message: string) {
    super(message, "AUTHORIZATION_ERROR", 403);
    this.name = "AuthorizationError";
  }
}

/**
 * Error for not found resources
 */
export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, "NOT_FOUND_ERROR", 404);
    this.name = "NotFoundError";
  }
}

/**
 * Error for file upload issues
 */
export class FileUploadError extends AppError {
  constructor(message: string) {
    super(message, "FILE_UPLOAD_ERROR", 400);
    this.name = "FileUploadError";
  }
}

/**
 * Error for database operations
 */
export class DatabaseError extends AppError {
  constructor(message: string) {
    super(message, "DATABASE_ERROR", 500);
    this.name = "DatabaseError";
  }
}

/**
 * Error for network issues
 */
export class NetworkError extends AppError {
  constructor(message: string) {
    super(message, "NETWORK_ERROR", 503);
    this.name = "NetworkError";
  }
}

/**
 * Error for rate limiting
 */
export class RateLimitError extends AppError {
  constructor(message: string) {
    super(message, "RATE_LIMIT_ERROR", 429);
    this.name = "RateLimitError";
  }
}

/**
 * Error for server issues
 */
export class ServerError extends AppError {
  constructor(message: string) {
    super(message, "SERVER_ERROR", 500);
    this.name = "ServerError";
  }
}
