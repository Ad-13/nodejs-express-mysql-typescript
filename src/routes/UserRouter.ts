import CrudRouter from './CrudRouter';
import UserController from '../controllers/UserController';
import { TUser } from '@root/types';

class UserRouter extends CrudRouter<TUser> {
  constructor() {
    super(UserController);
  }

  protected initRoutes(): void {
    this.router.post('/', this.routeController.create);
    this.router.get('/:id', this.routeController.getById);
    this.router.get('/', this.routeController.getAll);
    this.router.put('/:id', this.routeController.update);
    this.router.delete('/:id', this.routeController.delete);
  }
}

export default new UserRouter().getRouter();
