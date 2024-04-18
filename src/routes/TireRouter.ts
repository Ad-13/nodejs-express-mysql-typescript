import TireController from '@controllers/TireController';

import { authMiddleware } from '@middlewares/AuthMiddleware';
import { roleMiddleware } from '@middlewares/RoleMiddleware';

import { TTire, TInputCreateTire, TInputUpdateTire, TOutputTire } from '@helpersTypes/tire';
import { ERoles } from '@enums/ERoles';

import CrudRouter from './CrudRouter';

class TireRouter extends CrudRouter<TTire, TInputCreateTire, TInputUpdateTire, TOutputTire> {
  constructor() {
    super(TireController);
  }

  protected initRoutes(): void {
    this.router.post(
      '/',
      authMiddleware,
      roleMiddleware([ERoles.Admin]),
      this.routeController.create,
    );
    this.router.get('/:id', this.routeController.getById);
    this.router.get('/', this.routeController.getAll);
    this.router.put(
      '/:id',
      authMiddleware,
      roleMiddleware([ERoles.Admin]),
      this.routeController.update,
    );
    this.router.delete(
      '/:id',
      authMiddleware,
      roleMiddleware([ERoles.Admin]),
      this.routeController.deleteById,
    );
  }
}

export default new TireRouter().getRouter();
