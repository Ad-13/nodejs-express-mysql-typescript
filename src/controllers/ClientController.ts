import ClientModel from '@db/models/UserModel';
import { TClient } from '@root/types';
import AbstractCrudController from './AbstractCrudController';

class ClientController extends AbstractCrudController<TClient> {
  protected model = ClientModel;
}

export default ClientController;
