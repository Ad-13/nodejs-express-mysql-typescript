import BaseError from './BaseError';

export default class UnauthorizedError extends BaseError {
  private static readonly _defaultMessage = 'Unauthorized';
  private static readonly _defaultStatusCode = 401;

  constructor(params?: {
    code?: number;
    message?: string;
    logging?: boolean;
    context?: { [key: string]: any };
  }) {
    super(UnauthorizedError._defaultMessage, UnauthorizedError._defaultStatusCode, params);
  }
}
