import * as Errors from '@errors/index';

import { TCrudModel, TCrudService } from '@helpersTypes/crud';
import { TId } from '@helpersTypes/id';

abstract class AbstractCrudService<TGeneralModel, TInputCreate, TInputUpdate, TOutput>
  implements TCrudService<TGeneralModel, TInputCreate, TInputUpdate, TOutput>
{
  protected abstract model: TCrudModel<TGeneralModel, TInputCreate, TInputUpdate>;
  protected abstract selectColumns: (keyof TGeneralModel)[];

  async create(data: TInputCreate): Promise<TOutput> {
    const id = await this.model.create(data);
    return this.model.readById<TOutput>(id, this.selectColumns);
  }

  public getById = async (id: TId): Promise<TOutput> => {
    const result = await this.model.readById<TOutput>(id, this.selectColumns);

    if (!result) throw new Errors.NotFoundError();

    return result;
  };

  public getAll = (conditions: Partial<TGeneralModel>): Promise<TOutput[]> =>
    this.model.read<TOutput>(conditions, this.selectColumns);

  async update(data: Partial<TInputUpdate>): Promise<TOutput> {
    const id = await this.model.update(data);
    return await this.model.readById<TOutput>(id, this.selectColumns);
  }

  public deleteById = (id: TId): Promise<TId> => this.model.deleteById(id);
}

export default AbstractCrudService;
