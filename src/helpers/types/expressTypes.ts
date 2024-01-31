import { Request, Response } from 'express';

import { TOutputUser } from './user';

export type TResponse<T = any> = Response<T>;

export interface TRequest<BodyType = any, ParamsType = any> extends Request<ParamsType> {
  body: BodyType;
  params: ParamsType;
  user?: TOutputUser;
}

export type TRequestWithParams<ParamsType = any> = TRequest<any, ParamsType>;
