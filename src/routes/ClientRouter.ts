import BaseRouter from './BaseRouter';
import ClientController from '../controllers/ClientController';
import { TClient } from '@root/types';

class ClientRouter extends BaseRouter<TClient> {
  constructor() {
    super(ClientController);
  }

  protected initRoutes(): void {
    this.router.post('/', this.routeController.create);
    this.router.get('/:id', this.routeController.getById);
    this.router.get('/', this.routeController.getAll);
    this.router.put('/:id', this.routeController.update);
    this.router.delete('/:id', this.routeController.delete);
  }
}

export default new ClientRouter().getRouter();
