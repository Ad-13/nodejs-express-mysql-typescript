import BaseRouter from './BaseRouter';
import UserController from '../controllers/UserController';
import { TUser } from '@root/types';

class UserRouter extends BaseRouter<TUser> {
  constructor() {
    super(UserController);
  }

  protected initRoutes(): void {
    this.router.post('/users', this.routeController.create);
    this.router.get('/users/:id', this.routeController.getById);
    this.router.get('/users', this.routeController.getAll);
    this.router.put('/users/:id', this.routeController.update);
    this.router.delete('/users/:id', this.routeController.delete);
  }
}

export default new UserRouter().getRouter();
