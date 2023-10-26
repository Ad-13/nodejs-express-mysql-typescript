abstract class BaseError extends Error {
  protected statusCode: number = 500;
}

class ValidationError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

export { ValidationError, NotFoundError };
