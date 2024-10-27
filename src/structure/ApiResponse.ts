export class ApiResponse<T> {
  public statusCode: number;
  public message?: string;
  public data?: T;

  constructor(statusCode: number, message?: string, data?: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  public static OK<T>(data?: T, message?: string): ApiResponse<T> {
    return new ApiResponse<T>(200, message, data);
  }

  public static CREATED<T>(data?: T, message?: string): ApiResponse<T> {
    return new ApiResponse<T>(201, message, data);
  }

  public static NOT_FOUND<T>(message?: string): ApiResponse<T> {
    return new ApiResponse<T>(404, message, null);
  }

  public static BAD_REQUEST<T>(message?: string): ApiResponse<T> {
    return new ApiResponse<T>(400, message, null);
  }

  public static UNAUTHORIZED<T>(message?: string): ApiResponse<T> {
    return new ApiResponse<T>(401, message, null);
  }

  public static FORBIDDEN<T>(message?: string): ApiResponse<T> {
    return new ApiResponse<T>(403, message, null);
  }

  public static UNPROCESSABLE_ENTITY<T>(message?: string): ApiResponse<T> {
    return new ApiResponse<T>(422, message, null);
  }

  public static INTERNAL_SERVER_ERROR<T>(message?: string): ApiResponse<T> {
    return new ApiResponse<T>(500, message, null);
  }
}
