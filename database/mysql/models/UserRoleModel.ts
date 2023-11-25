import AbstractCrudModel from './AbstractCrudModel';
import { ETables } from '@root/enums/ETables';
import { TId, TUserRole } from '@root/types';

class UserRoleModel extends AbstractCrudModel<TUserRole> {
  protected columnsForCreate = ['userId', 'roleId'];

  constructor() {
    super(ETables.UserRoles);
  }

  async create(data: Partial<TUserRole>): Promise<TUserRole> {
    const currentUsers = await this.read({ userId: data.userId });
    if (!currentUsers.length) this.throwDatabaseError('User not found', 404);

    const currentRoles = await this.read({ userId: data.userId });
    const hasRole = currentRoles.some(role => role.roleId === data.roleId);
    if (hasRole) this.throwDatabaseError(`User already has this role`, 400);

    return super.create(data);
  }

  async assignNewRolesToUser(userId: TId, newRoles: number[]): Promise<void> {
    const connection = this.mysqlDB.getConnection();

    try {
      await connection.beginTransaction();
      await this.delete({ userId });
      await Promise.all(newRoles.map(async roleId =>
        await this.create({ userId, roleId })
      ));
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      this.throwDatabaseError(`Transaction failed: ${(error as Error).message}`, 400);
    }
  }
}

export default new UserRoleModel();
