import { check } from 'express-validator';

import CarService from '@services/CarService';

import { TCar, TInputCreateCar, TInputUpdateCar, TOutputCar } from '@helpersTypes/car';
import { TRequest } from '@helpersTypes/expressTypes';
import { validateExpressData } from '@utils/validateExpressData';

import AbstractCrudController from './AbstractCrudController';

class CarController extends AbstractCrudController<
  TCar,
  TInputCreateCar,
  TInputUpdateCar,
  TOutputCar
> {
  protected service = CarService;

  protected validateCreateData = async (req: TRequest<TInputCreateCar>): Promise<void> => {
    const rules = [
      check('make', 'Make is required').notEmpty().isEmail(),
      check('model', 'Model is required').notEmpty(),
      check('year', 'year is required').notEmpty(),
    ];

    return validateExpressData(rules, req);
  };
}

export default CarController;
