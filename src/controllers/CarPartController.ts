import CarPartModel from '@db/models/CarPartModel';
import { TCarPart } from '@root/types';
import AbstractController from './AbstractController';

class CarPartController extends AbstractController<TCarPart> {
  protected model = new CarPartModel();
}

export default CarPartController;
