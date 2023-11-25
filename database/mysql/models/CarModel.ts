import AbstractCrudModel from './AbstractCrudModel';
import { ETables } from '@root/enums/ETables';
import { TCar } from '@root/types';

class CarModel extends AbstractCrudModel<TCar> {
  protected columnsForCreate = ['brand', 'model', 'year'];

  constructor() {
    super(ETables.Cars);
  }
}

export default new CarModel();
