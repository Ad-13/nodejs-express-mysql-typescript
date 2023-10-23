import AbstractModel from './AbstractModel';
import { TSeller } from '../../types';
import { ETables } from '../../utils/tables';

class SellerModel extends AbstractModel<TSeller> {
  protected columnsForCreate = ['email', 'password', 'name'];

  constructor() {
    super(ETables.Sellers);
  }
}

export default SellerModel;
