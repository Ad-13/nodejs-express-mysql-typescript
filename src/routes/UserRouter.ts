import UserController from '@controllers/UserController';

import { TUser, TInputCreateUser, TInputUpdateUser, TOutputUser } from '@helpersTypes/user';

import CrudRouter from './CrudRouter';

class UserRouter extends CrudRouter<TUser, TInputCreateUser, TInputUpdateUser, TOutputUser> {
  constructor() {
    super(UserController);
  }

  protected initRoutes(): void {
    this.router.post('/', this.routeController.create);
    this.router.get('/:id', this.routeController.getById);
    this.router.get('/', this.routeController.getAll);
    this.router.put('/:id', this.routeController.update);
    this.router.delete('/:id', this.routeController.deleteById);
  }
}

export default new UserRouter().getRouter();
