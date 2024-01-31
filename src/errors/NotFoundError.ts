import BaseError from './BaseError';

export default class NotFoundError extends BaseError {
  private static readonly _defaultMessage = 'Not found';
  private static readonly _defaultStatusCode = 404;

  constructor(params?: {
    code?: number;
    message?: string;
    logging?: boolean;
    context?: { [key: string]: any };
  }) {
    super(NotFoundError._defaultMessage, NotFoundError._defaultStatusCode, params);
  }
}
