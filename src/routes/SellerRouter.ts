import CrudRouter from './CrudRouter';
import SellerController from '../controllers/SellerController';
import { TSeller } from '@root/types';

class SellerRouter extends CrudRouter<TSeller> {
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
