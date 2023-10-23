import AbstractModel from './AbstractModel';
import { TCarPart } from '../../types';
import { ETables } from '../../utils/tables';

class CarPartModel extends AbstractModel<TCarPart> {
  protected columnsForCreate = ['name', 'price'];

  constructor() {
    super(ETables.CarParts);
  }
}

export default CarPartModel;
