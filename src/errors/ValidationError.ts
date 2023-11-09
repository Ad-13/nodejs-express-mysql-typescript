import BaseError from './BaseError';

export default class ValidationError extends BaseError {
  private static readonly _defaultMessage = 'Validation error';
  private static readonly _defaultStatusCode = 400;

  constructor(params?: { code?: number; message?: string; logging?: boolean; context?: { [key: string]: any } }) {
    super(ValidationError._defaultMessage, ValidationError._defaultStatusCode, params);
  }
}
