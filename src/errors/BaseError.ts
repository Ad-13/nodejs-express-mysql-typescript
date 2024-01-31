import { CustomError } from './CustomError';

export default class BaseError extends CustomError {
  protected readonly _code: number;
  protected readonly _logging: boolean;
  protected readonly _context: { [key: string]: any };

  constructor(
    defaultMessage: string,
    defaultStatusCode: number,
    params?: {
      code?: number;
      message?: string;
      logging?: boolean;
      context?: { [key: string]: any };
    },
  ) {
    const { code, message, logging } = params || {};

    super(message || defaultMessage);
    this._code = code || defaultStatusCode;
    this._logging = logging || false;
    this._context = params?.context || {};

    // Only because we are extending a built-in class
    Object.setPrototypeOf(this, BaseError.prototype);
  }

  get errors() {
    return [{ message: this.message, context: this._context }];
  }

  get statusCode() {
    return this._code;
  }

  get logging() {
    return this._logging;
  }
}
