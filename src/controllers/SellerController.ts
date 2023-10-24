import SellerModel from '@db/models/SellerModel';
import { TSeller } from '@root/types';
import AbstractController from './AbstractController';

class SellerController extends AbstractController<TSeller> {
  protected model = new SellerModel();
}

export default SellerController;
