import { TId } from '@root/types';
import { Request, Response } from 'express';

export type TError = { error: string }
export type TIdParams = { id: TId }

export type TController<T> = {
  create(req: Request<{}, {}, Partial<T>>, res: Response<Partial<T> | TError>): Promise<void>
  getById(req: Request<TIdParams>, res: Response<Partial<T> | TError>): Promise<void>
  getAll(req: Request<{}, {}, Partial<T>>, res: Response<Partial<T>[] | TError>): Promise<void>
  update(req: Request<{}, {}, Partial<T>>, res: Response<Partial<T> | TError>): Promise<void>
  delete(req: Request<TIdParams>, res: Response<TError | TId>): Promise<void>
}
