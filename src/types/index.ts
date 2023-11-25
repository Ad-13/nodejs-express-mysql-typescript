import { UserDto } from '@app/dtos/UserDto';
import { TId, TUser } from '@root/types';
import { Request, Response } from 'express';

export type TError = { error: string }
export type CustomErrorContent = {
  message: string,
  context?: { [key: string]: any }
};
export type TIdParams = { id: TId }
export type TTokens = {
  accessToken: string;
  refreshToken: string;
}
export type TUserLoginData = TTokens & {user: Partial<TUser>}

export type TCrudController<T> = {
  create(req: Request<{}, {}, Partial<T>>, res: Response<Partial<T>>): Promise<void>
  getById(req: Request<TIdParams>, res: Response<Partial<T>>): Promise<void>
  getAll(req: Request<{}, {}, Partial<T>>, res: Response<Partial<T>[]>): Promise<void>
  update(req: Request<{}, {}, Partial<T>>, res: Response<Partial<T>>): Promise<void>
  deleteById(req: Request<TIdParams>, res: Response<TId>): Promise<void>
}

export type TAuthController = {
  registrate(req: Request<{}, {}, Partial<TUser>>, res: Response<TUserLoginData>): Promise<void>
  login(req: Request<{}, {}, Partial<TUser>>, res: Response<TUserLoginData>): Promise<void>
  logout(req: Request<{}, {}, Partial<TUser>>, res: Response<string>): Promise<void>
  activate(req: Request<{link: string}>, res: Response): Promise<void>
  refresh(req: Request, res: Response<TUserLoginData>): Promise<void>
}

export interface AuthenticatedRequest extends Request {
  user?: UserDto;
}
