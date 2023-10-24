import UserModel from '@db/models/UserModel';
import { TUser } from '@root/types';
import AbstractController from './AbstractController';

class UserController extends AbstractController<TUser> {
  protected model = new UserModel();
}

export default UserController;
