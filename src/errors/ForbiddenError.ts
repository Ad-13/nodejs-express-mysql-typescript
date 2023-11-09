import BaseError from './BaseError';

export default class ForbiddenError extends BaseError {
  private static readonly _defaultMessage = 'Forbidden';
  private static readonly _defaultStatusCode = 403;

  constructor(params?: { code?: number; message?: string; logging?: boolean; context?: { [key: string]: any } }) {
    super(ForbiddenError._defaultMessage, ForbiddenError._defaultStatusCode, params);
  }
}
