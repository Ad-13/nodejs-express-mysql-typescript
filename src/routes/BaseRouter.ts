import { Router } from 'express';

abstract class BaseRouter<TController> {
  protected router: Router;
  protected routeController: TController;

  constructor(Controller: new () => TController) {
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
