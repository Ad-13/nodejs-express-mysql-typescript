import { ETables } from '@enums/ETables';
import {
  TContactMessage,
  TInputCreateContactMessage,
  TInputUpdateContactMessage,
} from '@helpersTypes/car';

import AbstractCrudModel from './AbstractCrudModel';

class ContactMessageModel extends AbstractCrudModel<
  TContactMessage,
  TInputCreateContactMessage,
  TInputUpdateContactMessage
> {
  constructor() {
    super(ETables.ContactMessages);
  }
}

export default new ContactMessageModel();
