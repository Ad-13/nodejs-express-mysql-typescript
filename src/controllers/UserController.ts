import UserService from '@services/UserService';

import { TUser, TInputCreateUser, TInputUpdateUser, TOutputUser } from '@helpersTypes/user';

import AbstractCrudController from './AbstractCrudController';

class UserController extends AbstractCrudController<
  TUser,
  TInputCreateUser,
  TInputUpdateUser,
  TOutputUser
> {
  protected service = UserService;
}

export default UserController;
