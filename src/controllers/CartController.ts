import { check } from 'express-validator';

import ContactMessageService from '@services/ContactMessageService';
import CartService from '@services/CartService';

import * as Errors from '@errors/index';

import {
  TCart,
  TCartProduct,
  TInputCreateCart,
  TInputUpdateCart,
  TOutputCart,
} from '@helpersTypes/cart';
import { TRequest, TRequestWithParams, TResponse } from '@helpersTypes/expressTypes';
import { validateExpressData } from '@utils/validateExpressData';
import { TId } from '@helpersTypes/id';
import { getCartWithProducts } from '@utils/getCartWithProducts';
import { getProductById } from '@utils/getProductById';

import AbstractCrudController from './AbstractCrudController';

class CartController extends AbstractCrudController<
  TCart,
  TInputCreateCart,
  TInputUpdateCart,
  TOutputCart
> {
  protected service = CartService;
  protected contactMessageService = ContactMessageService;

  protected validateCreateData = async (req: TRequest<TInputCreateCart>): Promise<void> => {
    const rules = [
      check('userId', 'User Id is required').notEmpty(),
      check('productId', 'Product Id is required').notEmpty(),
      check('productType', 'Product Type is required').notEmpty(),
      check('quantity', 'Quantity is required').notEmpty(),
    ];

    return validateExpressData(rules, req);
  };

  public create = async (
    req: TRequest<TInputCreateCart>,
    res: TResponse<TOutputCart>,
  ): Promise<void> => {
    await this.validateCreateData?.(req);

    const data = req.body;
    const product = await getProductById({
      productId: data.productId,
      productType: data.productType,
    });

    if (!product) throw new Errors.NotFoundError({ message: 'Product not found' });

    if (data.quantity > product.quantity) {
      throw new Errors.ConflictError({
        message: 'Out of stock. Please specify different quantity',
      });
    }

    const result = await this.service.create(data);

    res.status(201).json(result);
  };

  public update = async (
    req: TRequest<TInputUpdateCart>,
    res: TResponse<TOutputCart>,
  ): Promise<void> => {
    await this.validateUpdateData?.(req);

    const data = req.body;
    const product = await getProductById({
      productId: data.productId,
      productType: data.productType,
    });

    if (!product) throw new Errors.NotFoundError({ message: 'Product not found' });

    if (data.quantity > product.quantity) {
      throw new Errors.ConflictError({
        message: 'Out of stock. Please specify different quantity',
      });
    }

    const result = await this.service.update(data);

    res.status(201).json(result);
  };

  public getCartProducts = async (
    req: TRequestWithParams<{ userId: TId }>,
    res: TResponse<TCartProduct[]>,
  ): Promise<void> => {
    const { userId } = req.params;

    const cartItems = await this.service.getAll({ userId });

    const cartWithProducts = await getCartWithProducts(cartItems);

    res.status(201).json(cartWithProducts);
  };
}

export default CartController;
