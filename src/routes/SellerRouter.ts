import BaseRouter from './BaseRouter';
import SellerController from '../controllers/SellerController';
import { TSeller } from '@root/types';

class SellerRouter extends BaseRouter<TSeller> {
  constructor() {
    super(SellerController);
  }

  protected initRoutes(): void {
    this.router.post('/sellers', this.routeController.create);
    this.router.get('/sellers/:id', this.routeController.getById);
    this.router.get('/sellers', this.routeController.getAll);
    this.router.put('/sellers/:id', this.routeController.update);
    this.router.delete('/sellers/:id', this.routeController.delete);
  }
}

export default new SellerRouter().getRouter();
