import BaseRouter from './BaseRouter';
import SellerController from '../controllers/SellerController';
import { TSeller } from '@root/types';

class SellerRouter extends BaseRouter<TSeller> {
  constructor() {
    super(SellerController);
  }

  protected initRoutes(): void {
    this.router.post('/', this.routeController.create);
    this.router.get('/:id', this.routeController.getById);
    this.router.get('/', this.routeController.getAll);
    this.router.put('/:id', this.routeController.update);
    this.router.delete('/:id', this.routeController.delete);
  }
}

export default new SellerRouter().getRouter();
