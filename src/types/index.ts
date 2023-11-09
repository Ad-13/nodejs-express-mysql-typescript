import { TId } from '@root/types';
import { NextFunction, Request, Response } from 'express';

export type TError = { error: string }
export type TIdParams = { id: TId }

export type TController<T> = {
  create(req: Request<{}, {}, Partial<T>>, res: Response<Partial<T> | TError>, next: NextFunction): Promise<void>
  getById(req: Request<TIdParams>, res: Response<Partial<T> | TError>, next: NextFunction): Promise<void>
  getAll(req: Request<{}, {}, Partial<T>>, res: Response<Partial<T>[] | TError>, next: NextFunction): Promise<void>
  update(req: Request<{}, {}, Partial<T>>, res: Response<Partial<T> | TError>, next: NextFunction): Promise<void>
  delete(req: Request<TIdParams>, res: Response<TError | TId>, next: NextFunction): Promise<void>
}
