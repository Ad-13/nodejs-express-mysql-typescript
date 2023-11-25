import CrudRouter from './CrudRouter';
import RoleController from '../controllers/RoleController';
import { TRole } from '@root/types';

class RoleRouter extends CrudRouter<TRole> {
  constructor() {
    super(RoleController);
  }

  protected initRoutes(): void {
    this.router.post('/', this.routeController.create);
    this.router.get('/', this.routeController.getAll);
    this.router.put('/:id', this.routeController.update);
    this.router.delete('/:id', this.routeController.deleteById);
  }
}

export default new RoleRouter().getRouter();
