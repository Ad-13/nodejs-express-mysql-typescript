import { Router, Request, Response } from 'express';

import logger from '@root/logger';
import { NotFoundError, ValidationError } from '@app/errors';
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

  protected handleErrors() {
    this.router.use((err: Error, _req: Request, res: Response): void => {
      switch (true) {
        case err instanceof ValidationError:
          res.status(400).json({ error: 'Bad Request', message: err.message });
          break;
        case err instanceof NotFoundError:
          res.status(404).json({ error: 'Not Found', message: err.message });
          break;
        default:
          console.error(err);
          logger.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  }

  public getRouter(): Router {
    this.handleErrors();
    return this.router;
  }
}

export default BaseRouter;
