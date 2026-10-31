export class ApiError extends Error {
  status: "fail" | "error";
  constructor(
    public message: string,
    public statusCode: number,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode <= 500 ? "fail" : "error";
    Error.captureStackTrace(this, ApiError);
  }
}
