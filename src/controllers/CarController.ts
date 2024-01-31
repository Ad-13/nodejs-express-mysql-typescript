import CarService from '@services/CarService';

import { TCar, TInputCreateCar, TInputUpdateCar, TOutputCar } from '@helpersTypes/car';

import AbstractCrudController from './AbstractCrudController';

class CarController extends AbstractCrudController<
  TCar,
  TInputCreateCar,
  TInputUpdateCar,
  TOutputCar
> {
  protected service = CarService;
}

export default CarController;
