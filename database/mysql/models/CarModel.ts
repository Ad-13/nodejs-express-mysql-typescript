import AbstractModel from './AbstractModel';
import { TCar } from '../../types';
import { ETables } from '../../utils/tables';

class CarModel extends AbstractModel<TCar> {
  protected columnsForCreate = ['make', 'model', 'year'];

  constructor() {
    super(ETables.Cars);
  }
}

export default CarModel;
