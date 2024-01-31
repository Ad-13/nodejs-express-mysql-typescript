import { ETables } from '@enums/ETables';
import { TRole, TInputCreateRole, TInputUpdateRole } from '@helpersTypes/role';

import AbstractCrudModel from './AbstractCrudModel';

class RoleModel extends AbstractCrudModel<TRole, TInputCreateRole, TInputUpdateRole> {
  constructor() {
    super(ETables.Roles);
  }
}

export default new RoleModel();
