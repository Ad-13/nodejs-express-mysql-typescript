import ContactMessageModel from '@db/mysql/models/ContactMessageModel';

import {
  TContactMessage,
  TInputCreateContactMessage,
  TInputUpdateContactMessage,
  TOutputContactMessage,
} from '@helpersTypes/car';

import AbstractCrudService from './AbstractCrudService';

class ContactMessageService extends AbstractCrudService<
  TContactMessage,
  TInputCreateContactMessage,
  TInputUpdateContactMessage,
  TOutputContactMessage
> {
  protected model = ContactMessageModel;
  protected selectColumns: (keyof TContactMessage)[] = [
    'id',
    'carId',
    'createdAt',
    'email',
    'message',
    'name',
  ];
}

export default new ContactMessageService();
