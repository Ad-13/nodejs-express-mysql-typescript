import SellerModel from '@db/models/SellerModel';
import { TSeller } from '@root/types';
import AbstractCrudController from './AbstractCrudController';

class SellerController extends AbstractCrudController<TSeller> {
  protected model = SellerModel;
}

export default SellerController;
