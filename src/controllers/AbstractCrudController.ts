import { Request, Response } from 'express';

import { TId, TCrudModel } from '@root/types';
import { TCrudController, TIdParams } from '@app/types';
import * as Errors from '@app/errors';

abstract class AbstractCrudController<T> implements TCrudController<T> {
  protected abstract model: TCrudModel<T>;
  
  protected validateCreateData(req: Request<{}, {}, Partial<T>>): void {}
  protected validateUpdateData(req: Request<{}, {}, Partial<T>>): void {}

  async create(req: Request<{}, {}, Partial<T>>, res: Response<Partial<T>>): Promise<void> {
    this.validateCreateData?.(req);

    const data = req.body;

    const result = await this.model.create(data);
    res.status(201).json(result);
  }

  async getById(req: Request<TIdParams>, res: Response<Partial<T>>): Promise<void> {
    const id = req.params.id;
    const result = await this.model.readById(id);

    if (!result) {
      throw new Errors.NotFoundError();
    }

    res.status(200).json(result);
  }

  async getAll(_req: Request, res: Response<Partial<T>[]>): Promise<void> {
    const result = await this.model.read({});
    res.status(200).json(result);
  }

  async update(req: Request<TIdParams, {}, Partial<T>>, res: Response<Partial<T>>): Promise<void> {
    this.validateUpdateData?.(req);

    const id = req.params.id;
    const data = req.body;

    // TODO: check permissions
    if (false) {
      throw new Errors.ForbiddenError();
    }

    const result = await this.model.update({ ...data, id });
    res.status(200).json(result);
  }

  async deleteById(req: Request<TIdParams>, res: Response<TId>): Promise<void> {
    const { id } = req.params;

    // TODO: check permissions
    if (false) {
      throw new Errors.ForbiddenError();
    }

    const result = await this.model.deleteById(id);
    res.status(200).json(result);
  }
}

export default AbstractCrudController;
