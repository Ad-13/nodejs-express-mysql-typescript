import AbstractCrudModel from './AbstractCrudModel';
import { ETables } from '@root/enums/ETables';
import { TUser } from '@root/types';

class UserModel extends AbstractCrudModel<TUser> {
  protected columnsForCreate = ['email', 'password', 'name', 'roles'];

  constructor() {
    super(ETables.Users);
  }
}

export default new UserModel();
