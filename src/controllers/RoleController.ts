import RoleModel from '@db/models/RoleModel';
import { TRole } from '@root/types';
import AbstractCrudController from './AbstractCrudController';

class RoleController extends AbstractCrudController<TRole> {
  protected model = RoleModel;
}

export default RoleController;
