import CarPartModel from '@db/models/CarPartModel';
import { TCarPart } from '@root/types';
import AbstractCrudController from './AbstractCrudController';

class CarPartController extends AbstractCrudController<TCarPart> {
  protected model = CarPartModel;
}

export default CarPartController;
