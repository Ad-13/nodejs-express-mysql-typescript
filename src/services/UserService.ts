import UserModel from '@db/mysql/models/UserModel'; // TODO: create IRepository layer and fix model issue of breaking SOLID principle

import { TUser, TInputCreateUser, TInputUpdateUser, TOutputUser } from '@helpersTypes/user';

import AbstractCrudService from './AbstractCrudService';

class UserService extends AbstractCrudService<
  TUser,
  TInputCreateUser,
  TInputUpdateUser,
  TOutputUser
> {
  protected model = UserModel;
  protected selectColumns: (keyof TUser)[] = ['email', 'id', 'isActivated', 'name', 'roles'];
}

export default new UserService();
