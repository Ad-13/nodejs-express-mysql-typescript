import AbstractCrudModel from './AbstractCrudModel';
import { ETables } from '../../utils/tables';
import { TClient } from '@root/types';

class ClientModel extends AbstractCrudModel<TClient> {
  protected columnsForCreate = ['email', 'password', 'name'];

  constructor() {
    super(ETables.Clients);
  }
}

export default new ClientModel();
