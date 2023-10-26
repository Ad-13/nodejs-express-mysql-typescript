import BaseRouter from './BaseRouter';
import ClientController from '../controllers/ClientController';
import { TClient } from '@root/types';

class ClientRouter extends BaseRouter<TClient> {
  constructor() {
    super(ClientController);
  }

  protected initRoutes(): void {
    this.router.post('/clients', this.routeController.create);
    this.router.get('/clients/:id', this.routeController.getById);
    this.router.get('/clients', this.routeController.getAll);
    this.router.put('/clients/:id', this.routeController.update);
    this.router.delete('/clients/:id', this.routeController.delete);
  }
}

export default new ClientRouter().getRouter();
