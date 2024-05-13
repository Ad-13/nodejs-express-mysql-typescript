import { TCrudController, TCrudService } from '@helpersTypes/crud';
import { TRequest, TRequestWithParams, TResponse } from '@helpersTypes/expressTypes';
import { TId, TIdParams } from '@helpersTypes/id';

abstract class AbstractCrudController<TGeneralModel, TInputCreate, TInputUpdate, TOutput>
  implements TCrudController<TGeneralModel, TInputCreate, TInputUpdate, TOutput>
{
  protected abstract service: TCrudService<TGeneralModel, TInputCreate, TInputUpdate, TOutput>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected async validateCreateData(req: TRequest<TInputCreate>): Promise<void> {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected async validateUpdateData(req: TRequest<TInputUpdate>): Promise<void> {}

  public create = async (req: TRequest<TInputCreate>, res: TResponse<TOutput>): Promise<void> => {
    await this.validateCreateData?.(req);

    const data = req.body;
    const result = await this.service.create(data);

    res.status(201).json(result);
  };

  public getById = async (
    req: TRequestWithParams<TIdParams>,
    res: TResponse<TOutput>,
  ): Promise<void> => {
    const id = req.params.id;
    const result = await this.service.getById(id);

    res.status(200).json(result);
  };

  public getAll = async (_req: TRequest, res: TResponse<TOutput[]>): Promise<void> => {
    const result = await this.service.getAll({});

    res.status(200).json(result);
  };

  public update = async (
    req: TRequest<TInputUpdate, TIdParams>,
    res: TResponse<TOutput>,
  ): Promise<void> => {
    this.validateUpdateData?.(req);

    const id = req.params.id;
    const data = req.body;
    const result = await this.service.update({ ...data, id });

    res.status(200).json(result);
  };

  public deleteById = async (
    req: TRequestWithParams<TIdParams>,
    res: TResponse<TId>,
  ): Promise<void> => {
    const { id } = req.params;
    const result = await this.service.deleteById(id);

    res.status(200).json(result);
  };
}

export default AbstractCrudController;
