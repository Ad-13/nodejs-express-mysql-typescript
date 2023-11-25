import AbstractCrudModel from './AbstractCrudModel';
import { ETables } from '@root/enums/ETables';
import { TRole } from '@root/types';

class RoleModel extends AbstractCrudModel<TRole> {
  protected columnsForCreate = ['value', 'description'];

  constructor() {
    super(ETables.Roles);
  }
}

export default new RoleModel();
