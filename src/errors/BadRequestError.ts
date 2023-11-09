import BaseError from './BaseError';

export default class BadRequestError extends BaseError {
  private static readonly _defaultMessage = 'Bad request';
  private static readonly _defaultStatusCode = 400;

  constructor(params?: { code?: number; message?: string; logging?: boolean; context?: { [key: string]: any } }) {
    super(BadRequestError._defaultMessage, BadRequestError._defaultStatusCode, params);
  }
}
