import { ETables } from '@enums/ETables';
import { TCart, TInputCreateCart, TInputUpdateCart } from '@helpersTypes/cart';

import AbstractCrudModel from './AbstractCrudModel';

class CartModel extends AbstractCrudModel<TCart, TInputCreateCart, TInputUpdateCart> {
  constructor() {
    super(ETables.Cart);
  }
}

export default new CartModel();
