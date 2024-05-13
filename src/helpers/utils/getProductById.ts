import CarService from '@services/CarService';
import TireService from '@services/TireService';

import * as Errors from '@errors/index';

import { ETables } from '@enums/ETables';
import { TId } from '@helpersTypes/id';

type TProp = {
  productType: ETables;
  productId: TId;
};

export const getProductById = async ({ productType, productId }: TProp) => {
  let service;

  switch (productType) {
    case ETables.Tires:
      service = TireService;
      break;
    case ETables.Cars:
      service = CarService;
      break;
    default:
      throw new Errors.NotFoundError();
  }

  return await service.getById(productId);
};
