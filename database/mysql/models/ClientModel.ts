import AbstractModel from './AbstractModel';
import { TClientRowDataPacket } from '../../types';
import { ETables } from '../../utils/tables';

class ClientModel extends AbstractModel<TClientRowDataPacket> {
  protected columnsForCreate = ['email', 'password', 'name'];

  constructor() {
    super(ETables.Clients);
  }
}

export default ClientModel;
