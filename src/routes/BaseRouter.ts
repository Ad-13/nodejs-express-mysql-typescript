import { Router } from 'express';

import AbstractController from '@app/controllers/AbstractController';

abstract class BaseRouter<T> {
  protected router: Router;
  protected routeController: AbstractController<T>;

  constructor(Controller: new () => AbstractController<T>) {
    this.routeController = new Controller();
    this.router = Router();
    this.initRoutes();
  }

  protected abstract initRoutes(): void;

  public getRouter(): Router {
    return this.router;
  }
}

export default BaseRouter;
