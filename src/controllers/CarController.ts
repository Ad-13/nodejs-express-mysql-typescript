import CarModel from '@db/models/CarModel';
import { TCar } from '@root/types';
import AbstractCrudController from './AbstractCrudController';

class CarController extends AbstractCrudController<TCar> {
  protected model = CarModel;
}

export default CarController;
