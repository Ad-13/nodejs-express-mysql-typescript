import AbstractCrudModel from './AbstractCrudModel';
import { ETables } from '../../utils/tables';
import { TCar } from '@root/types';

class CarModel extends AbstractCrudModel<TCar> {
  protected columnsForCreate = ['make', 'model', 'year'];

  constructor() {
    super(ETables.Cars);
  }
}

export default new CarModel();
