import CartController from '@controllers/CartController';

import { TCart, TInputCreateCart, TInputUpdateCart, TOutputCart } from '@helpersTypes/cart';

import CrudRouter from './CrudRouter';

class CartRouter extends CrudRouter<TCart, TInputCreateCart, TInputUpdateCart, TOutputCart> {
  constructor() {
    super(CartController);
  }

  protected initRoutes(): void {
    this.router.post('/', this.routeController.create);
    this.router.get('/:id', this.routeController.getById);
    this.router.get('/', this.routeController.getAll);
    this.router.put('/:id', this.routeController.update);
    this.router.delete('/:id', this.routeController.deleteById);
    this.router.get('/products/:userId', (this.routeController as CartController).getCartProducts);
  }
}

export default new CartRouter().getRouter();
