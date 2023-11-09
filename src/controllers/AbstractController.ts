import { Request, Response } from 'express';

import { TId, TModel } from '@root/types';
import { TController, TError, TIdParams } from '@app/types';
import * as Errors from '@app/errors';

abstract class AbstractController<T> implements TController<T> {
  protected abstract model: TModel<T>;

  async create(req: Request<{}, {}, Partial<T>>, res: Response<Partial<T> | TError>): Promise<void> {
    const data = req.body;

    // TODO: do not forget create validators for each derived controller

    const result = await this.model.create(data);
    res.status(201).json(result);
  }

  async getById(req: Request<TIdParams>, res: Response<Partial<T> | TError>): Promise<void> {
    const id = req.params.id;
    const result = await this.model.readById(id);

    if (!result) {
      throw new Errors.NotFoundError();
    }

    res.status(200).json(result);
  }

  async getAll(_req: Request, res: Response<Partial<T>[] | TError>): Promise<void> {
    const result = await this.model.read({});
    res.status(200).json(result);
  }

  async update(req: Request<TIdParams, {}, Partial<T>>, res: Response<Partial<T> | TError>): Promise<void> {
    const id = req.params.id;
    const data = req.body;

    // TODO: check permissions
    if (false) {
      throw new Errors.ForbiddenError();
    }

    const result = await this.model.update({ ...data, id });
    res.status(200).json(result);
  }

  async delete(req: Request<TIdParams>, res: Response<TId | TError>): Promise<void> {
    const id = req.params.id;

    // TODO: check permissions
    if (false) {
      throw new Errors.ForbiddenError();
    }

    const result = await this.model.delete(id);
    res.status(200).json(result);
  }
}

export default AbstractController;
