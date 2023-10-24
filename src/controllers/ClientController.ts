import ClientModel from '@db/models/UserModel';
import { TClient } from '@root/types';
import AbstractController from './AbstractController';

class ClientController extends AbstractController<TClient> {
  protected model = new ClientModel();
}

export default ClientController;
