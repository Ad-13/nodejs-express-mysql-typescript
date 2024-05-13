import { ETables } from '@enums/ETables';

import { TId } from './id';
import { TProduct } from './TProduct';

export type TCart = {
  id: TId;
  userId: TId;
  productId: TId;
  productType: ETables;
  quantity: number;
  createdAt: Date;
};

export type TInputCreateCart = Omit<TCart, 'id' | 'createdAt'>;

export type TInputUpdateCart = TCart;

export type TOutputCart = TCart;

export type TCartProduct = TCart & {
  product: TProduct;
};
