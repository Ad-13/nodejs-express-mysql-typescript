import { ResultSetHeader } from 'mysql2';

import AbstractCrudModel from '@db/mysql/models/AbstractCrudModel';
import UserRoleModel from '@db/mysql/models/UserRoleModel';

import { ETables } from '@enums/ETables';
import { EDbTransactions } from '@enums/EDbTransactions';
import { TUser, TInputCreateUser, TInputUpdateUser } from '@helpersTypes/user';
import { TId } from '@helpersTypes/id';

class UserModel extends AbstractCrudModel<TUser, TInputCreateUser, TInputUpdateUser> {
  protected userRoleModel = UserRoleModel;

  constructor() {
    super(ETables.Users);
  }

  // TODO: create IRepository layer and fix model issue of breaking SOLID principle
  async create(data: TInputCreateUser): Promise<TId> {
    const values = Object.values(data);
    const keys = Object.keys(data).join(', ');
    const valuesPlaceholder = Array.from({ length: values.length }, () => '?').join(',');
    const sql = `INSERT INTO ${this.tableName} (${keys}) VALUES(${valuesPlaceholder})`;
    const pool = await this.mysqlDB.getConnection();

    // TODO: investigate why Transaction doesn't work: when role's requesе failed, thransaction doesn't clear newly created user
    try {
      await pool.query(EDbTransactions.BeginTransaction);
      const result = await this.mysqlDB.executeQuery<ResultSetHeader>(sql, values);
      await Promise.all(
        data.roles.map(role =>
          this.userRoleModel.create({
            userId: result.insertId,
            roleValue: role,
          }),
        ),
      );

      await pool.query(EDbTransactions.Commit);
      return result.insertId;
    } catch (error) {
      await pool.query(EDbTransactions.Rollback);
      return this.throwDatabaseError(
        `Create user transaction failed: ${(error as Error).message}`,
        500,
      );
    }
  }

  async update(
    data: { id: NonNullable<TInputUpdateUser['id']> } & Partial<TInputUpdateUser>,
  ): Promise<TId> {
    const { id, ...updatedData } = data;
    const updateFields = Object.keys(updatedData)
      .map(key => `${key} = ?`)
      .join(', ');
    const sql = `UPDATE ${this.tableName} SET ${updateFields} WHERE id = ?`;
    const pool = await this.mysqlDB.getConnection();

    try {
      await pool.query(EDbTransactions.BeginTransaction);
      const currentRoles = await super.readById<Pick<TUser, 'roles'>>(id, ['roles']);
      const result = await this.mysqlDB.executeQuery<ResultSetHeader>(sql, [
        ...Object.values(updatedData),
        id,
      ]);

      if (!result.affectedRows) return this.throwDatabaseError('Not found', 404);

      const rolesToRemove = currentRoles.roles.filter(role => !updatedData.roles?.includes(role));
      const rolesToCreate =
        updatedData.roles?.filter(role => !currentRoles.roles.includes(role)) ?? [];

      if (rolesToRemove?.length) {
        await Promise.all(
          rolesToRemove.map(role =>
            this.userRoleModel.delete({
              userId: id,
              roleValue: role,
            }),
          ),
        );
      }

      if (rolesToCreate?.length) {
        await Promise.all(
          rolesToCreate.map(role =>
            this.userRoleModel.create({
              userId: id,
              roleValue: role,
            }),
          ),
        );
      }

      await pool.query(EDbTransactions.Commit);
      return id as TId;
    } catch (error) {
      await pool.query(EDbTransactions.Rollback);
      return this.throwDatabaseError(`Failed to update ${this.tableName}.\n${error}`, 500);
    }
  }
}

export default new UserModel();
