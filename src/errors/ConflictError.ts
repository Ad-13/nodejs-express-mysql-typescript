import BaseError from './BaseError';

export default class ConflictError extends BaseError {
  private static readonly _defaultMessage = 'Conflict';
  private static readonly _defaultStatusCode = 409;

  constructor(params?: {
    code?: number;
    message?: string;
    logging?: boolean;
    context?: { [key: string]: any };
  }) {
    super(ConflictError._defaultMessage, ConflictError._defaultStatusCode, params);
  }
}
