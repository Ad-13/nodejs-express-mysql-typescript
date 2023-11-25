import UserRoleModel from '@db/models/UserRoleModel';
import { TRole } from '@root/types';
import AbstractCrudController from './AbstractCrudController';

class UserRoleController {
// class UserRoleController extends AbstractCrudController<TRole> {
  protected model = UserRoleModel;
}

export default UserRoleController;
