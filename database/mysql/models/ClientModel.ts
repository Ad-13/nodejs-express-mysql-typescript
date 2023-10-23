import AbstractModel from './AbstractModel';
import { TClient } from '../../types';
import { ETables } from '../../utils/tables';

class ClientModel extends AbstractModel<TClient> {
  protected columnsForCreate = ['email', 'password', 'name'];

  constructor() {
    super(ETables.Clients);
  }
}

export default ClientModel;
