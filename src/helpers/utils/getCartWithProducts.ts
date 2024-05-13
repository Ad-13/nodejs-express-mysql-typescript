import { TCart } from '@helpersTypes/cart';

import { getProductById } from './getProductById';

export const getCartWithProducts = (cartItems: TCart[]) =>
  Promise.all(
    cartItems.map(async cartItem => {
      const product = await getProductById({
        productId: cartItem.productId,
        productType: cartItem.productType,
      });

      return {
        ...cartItem,
        product,
      };
    }),
  );
