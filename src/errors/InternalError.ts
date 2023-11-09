import BaseError from './BaseError';

export default class InternalError extends BaseError {
  private static readonly _defaultMessage = 'Internal server error';
  private static readonly _defaultStatusCode = 500;

  constructor(params?: { code?: number; message?: string; logging?: boolean; context?: { [key: string]: any } }) {
    super(InternalError._defaultMessage, InternalError._defaultStatusCode, params);
  }
}
