import { TRequest, TRequestWithParams, TResponse } from './expressTypes';
import { TId, TIdParams } from './id';

export type TCrudModel<TGeneralModel, TInputCreate, TInputUpdate> = {
  create(data: TInputCreate): Promise<TId>;
  readById<T>(id: TId, columnsForSelect: (keyof TGeneralModel)[]): Promise<T>;
  read<T>(
    conditions: Partial<TGeneralModel>,
    columnsForSelect: (keyof TGeneralModel)[],
  ): Promise<T[]>;
  update(data: Partial<TInputUpdate>): Promise<TId>;
  deleteById(id: TId): Promise<TId>;
};

export type TCrudService<TGeneralModel, TInputCreate, TInputUpdate, TOutput> = {
  create(data: TInputCreate): Promise<TOutput>;
  getById(id: TId): Promise<TOutput>;
  getAll(conditions: Partial<TGeneralModel>): Promise<TOutput[]>;
  update(data: Partial<TInputUpdate>): Promise<TOutput>;
  deleteById(id: TId): Promise<TId>;
};

export type TCrudController<TGeneralModel, TInputCreate, TInputUpdate, TOutput> = {
  create(req: TRequest<TInputCreate>, res: TResponse<TOutput>): Promise<void>;
  getById(req: TRequestWithParams<TIdParams>, res: TResponse<TOutput>): Promise<void>;
  getAll(req: TRequest<TGeneralModel>, res: TResponse<TOutput[]>): Promise<void>;
  update(req: TRequest<TInputUpdate>, res: TResponse<TOutput>): Promise<void>;
  deleteById(req: TRequestWithParams<TIdParams>, res: TResponse<TId>): Promise<void>;
};
