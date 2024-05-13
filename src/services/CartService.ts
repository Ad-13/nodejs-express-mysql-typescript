import CartModel from '@db/mysql/models/CartModel';

import { TCart, TInputCreateCart, TInputUpdateCart, TOutputCart } from '@helpersTypes/cart';

import AbstractCrudService from './AbstractCrudService';

class CartService extends AbstractCrudService<
  TCart,
  TInputCreateCart,
  TInputUpdateCart,
  TOutputCart
> {
  protected model = CartModel;
  protected selectColumns: (keyof TCart)[] = [
    'id',
    'userId',
    'productId',
    'productType',
    'quantity',
  ];
}

export default new CartService();
