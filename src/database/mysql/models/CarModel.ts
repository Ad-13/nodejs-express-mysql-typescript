import { ETables } from '@enums/ETables';
import { TCar, TInputCreateCar, TInputUpdateCar } from '@helpersTypes/car';

import AbstractCrudModel from './AbstractCrudModel';

class CarModel extends AbstractCrudModel<TCar, TInputCreateCar, TInputUpdateCar> {
  constructor() {
    super(ETables.Cars);
  }
}

export default new CarModel();
