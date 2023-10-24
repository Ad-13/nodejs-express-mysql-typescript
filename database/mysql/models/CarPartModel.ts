import AbstractModel from './AbstractModel';
import { TCarPartRowDataPacket } from '../../types';
import { ETables } from '../../utils/tables';

class CarPartModel extends AbstractModel<TCarPartRowDataPacket> {
  protected columnsForCreate = ['name', 'price'];

  constructor() {
    super(ETables.CarParts);
  }
}

export default CarPartModel;
