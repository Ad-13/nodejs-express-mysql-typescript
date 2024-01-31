import { ResultSetHeader } from 'mysql2';

import { ETables } from '@enums/ETables';
import { EDbTransactions } from '@enums/EDbTransactions';
import {
  TUserRole,
  TInputCreateUserRole,
  TInputUpdateUserRole,
  TInputDeleteUserRole,
} from '@helpersTypes/role';
import { TId } from '@helpersTypes/id';

import AbstractCrudModel from './AbstractCrudModel';

class UserRoleModel extends AbstractCrudModel<
  TUserRole,
  TInputCreateUserRole,
  TInputUpdateUserRole
> {
  constructor() {
    super(ETables.UserRoles);
  }

  async delete(conditions: Partial<TInputDeleteUserRole>): Promise<void> {
    if (!Object.keys(conditions).length) this.throwDatabaseError('Conditions not set', 404);

    const values = Object.values(conditions);
    const params = Object.keys(conditions)
      .map(key => `${key} = ?`)
      .join(' AND ');
    const sql = `DELETE FROM ${this.tableName} WHERE ${params}`;

    try {
      const result = await this.mysqlDB.executeQuery<ResultSetHeader>(sql, values);

      if (!result.affectedRows) this.throwDatabaseError('Not found', 404);
    } catch (error) {
      this.throwDatabaseError(`Failed to delete.\n${error}`, 500);
    }
  }

  async assignNewRolesToUser(userId: TId, newRoles: number[]): Promise<void> {
    const pool = await this.mysqlDB.getConnection();

    try {
      await pool.query(EDbTransactions.BeginTransaction);
      await this.delete({ userId });
      await Promise.all(newRoles.map(async role => await this.create({ userId, roleValue: role })));
      await pool.query(EDbTransactions.Commit);
    } catch (error) {
      await pool.query(EDbTransactions.Rollback);
      this.throwDatabaseError(`Transaction failed: ${(error as Error).message}`, 500);
    } finally {
      pool.release();
    }
  }
}

export default new UserRoleModel();
