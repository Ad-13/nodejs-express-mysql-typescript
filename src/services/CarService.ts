import CarModel from '@db/mysql/models/CarModel';

import { TCar, TInputCreateCar, TInputUpdateCar, TOutputCar } from '@helpersTypes/car';

import AbstractCrudService from './AbstractCrudService';

class CarService extends AbstractCrudService<TCar, TInputCreateCar, TInputUpdateCar, TOutputCar> {
  protected model = CarModel;
  protected selectColumns: (keyof TCar)[] = [
    'id',
    'make',
    'model',
    'year',
    'images',
    'description',
    'price',
    'quantity',
  ];
}

export default new CarService();
