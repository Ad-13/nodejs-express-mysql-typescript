import BaseRouter from './BaseRouter';
import AbstractCrudController from '@app/controllers/AbstractCrudController';

abstract class CrudRouter<T> extends BaseRouter<AbstractCrudController<T>> {}

export default CrudRouter;
