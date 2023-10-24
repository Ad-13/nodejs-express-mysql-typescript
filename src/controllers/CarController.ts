import CarModel from '@db/models/CarModel';
import { TCar } from '@root/types';
import AbstractController from './AbstractController';

class CarController extends AbstractController<TCar> {
  protected model = new CarModel();
}

export default CarController;
