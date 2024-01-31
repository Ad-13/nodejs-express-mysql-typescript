import { ETables } from '@enums/ETables';
import { TCarPart, TInputCreateCarPart, TInputUpdateCarPart } from '@helpersTypes/carPart';

import AbstractCrudModel from './AbstractCrudModel';

class CarPartModel extends AbstractCrudModel<TCarPart, TInputCreateCarPart, TInputUpdateCarPart> {
  constructor() {
    super(ETables.CarParts);
  }
}

export default new CarPartModel();
