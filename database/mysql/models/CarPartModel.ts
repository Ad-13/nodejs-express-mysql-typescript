import AbstractCrudModel from './AbstractCrudModel';
import { ETables } from '@root/enums/ETables';
import { TCarPart } from '@root/types';

class CarPartModel extends AbstractCrudModel<TCarPart> {
  protected columnsForCreate = ['name', 'price'];

  constructor() {
    super(ETables.CarParts);
  }
}

export default new CarPartModel();
