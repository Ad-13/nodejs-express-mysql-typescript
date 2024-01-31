import AbstractCrudController from '@controllers/AbstractCrudController';

import BaseRouter from './BaseRouter';

abstract class CrudRouter<TGeneralModel, TInputCreate, TInputUpdate, TOutput> extends BaseRouter<
  AbstractCrudController<TGeneralModel, TInputCreate, TInputUpdate, TOutput>
> {}

export default CrudRouter;
