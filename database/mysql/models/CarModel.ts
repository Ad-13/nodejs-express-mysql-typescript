import AbstractModel from './AbstractModel';
import { TCarRowDataPacket } from '../../types';
import { ETables } from '../../utils/tables';

class CarModel extends AbstractModel<TCarRowDataPacket> {
  protected columnsForCreate = ['make', 'model', 'year'];

  constructor() {
    super(ETables.Cars);
  }
}

export default CarModel;
