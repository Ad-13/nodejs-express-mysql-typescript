import AbstractCrudModel from './AbstractCrudModel';
import { ETables } from '../../utils/tables';
import { TSeller } from '@root/types';

class SellerModel extends AbstractCrudModel<TSeller> {
  protected columnsForCreate = ['email', 'password', 'name'];

  constructor() {
    super(ETables.Sellers);
  }
}

export default new SellerModel();
