import UserModel from '@db/models/UserModel';
import { TUser } from '@root/types';
import AbstractCrudController from './AbstractCrudController';

class UserController extends AbstractCrudController<TUser> {
  protected model = UserModel;
}

export default UserController;
