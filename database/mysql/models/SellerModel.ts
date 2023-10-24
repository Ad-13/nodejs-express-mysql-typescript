import AbstractModel from './AbstractModel';
import { TSellerRowDataPacket } from '../../types';
import { ETables } from '../../utils/tables';

class SellerModel extends AbstractModel<TSellerRowDataPacket> {
  protected columnsForCreate = ['email', 'password', 'name'];

  constructor() {
    super(ETables.Sellers);
  }
}

export default SellerModel;
