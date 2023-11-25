import AbstractCrudModel from './AbstractCrudModel';
import { ETables } from '@root/enums/ETables';
import { TSeller } from '@root/types';

class SellerModel extends AbstractCrudModel<TSeller> {
  protected columnsForCreate = ['email', 'password', 'name'];

  constructor() {
    super(ETables.Sellers);
  }
}

export default new SellerModel();
