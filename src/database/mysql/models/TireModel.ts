import { ETables } from '@enums/ETables';
import { TTire, TInputCreateTire, TInputUpdateTire } from '@helpersTypes/tire';

import AbstractCrudModel from './AbstractCrudModel';

class TireModel extends AbstractCrudModel<TTire, TInputCreateTire, TInputUpdateTire> {
  constructor() {
    super(ETables.Tires);
  }
}

export default new TireModel();
