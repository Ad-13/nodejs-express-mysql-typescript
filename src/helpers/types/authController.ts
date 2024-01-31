import { TRequest, TRequestWithParams, TResponse } from './expressTypes';
import { TUser } from './user';

export type TInputActivate = { link: string };

export type TOutputAuth = { accessToken: string };

export type TInputLogin = Pick<TUser, 'email' | 'password'>;

export type TInputRegistrate = Pick<TUser, 'name' | 'email' | 'password' | 'telephone'>;

export type TAuthController = {
  registrate(req: TRequest<TInputRegistrate>, res: TResponse<TOutputAuth>): Promise<void>;
  login(req: TRequest<TInputLogin>, res: TResponse<TOutputAuth>): Promise<void>;
  logout(req: TRequest, res: TResponse): Promise<void>;
  activate(req: TRequestWithParams<TInputActivate>, res: TResponse): Promise<void>;
  refresh(req: TRequest, res: TResponse<TOutputAuth>): Promise<void>;
};
