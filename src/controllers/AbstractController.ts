import { Request, Response } from 'express';

import { TId, TModel } from '@root/types';
import { TController, TError, TIdParams } from '@app/types';

abstract class AbstractController<T> implements TController<T> {
  protected abstract model: TModel<T>;

  async create(req: Request<{}, {}, Partial<T>>, res: Response<Partial<T> | TError>): Promise<void> {
    try {
      const data = req.body;
      const result = await this.model.create(data);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create' });
    }
  }

  async getById(req: Request<TIdParams>, res: Response<Partial<T> | TError>): Promise<void> {
    const id = req.params.id;
    try {
      const result = await this.model.readById(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({ error: 'Not found' });
    }
  }

  async getAll(_req: Request, res: Response<Partial<T>[] | TError>): Promise<void> {
    try {
      const result = await this.model.read({});
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve data' });
    }
  }

  async update(req: Request<TIdParams, {}, Partial<T>>, res: Response<Partial<T> | TError>): Promise<void> {
    const id = req.params.id;
    const data = req.body;
    try {
      const result = await this.model.update({ ...data, id });
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({ error: 'Not found' });
    }
  }

  async delete(req: Request<TIdParams>, res: Response<TId | TError>): Promise<void> {
    const id = req.params.id;
    try {
      const result = await this.model.delete(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete' });
    }
  }

}

export default AbstractController;
