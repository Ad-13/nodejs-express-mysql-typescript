import { ResultSetHeader, RowDataPacket } from 'mysql2';

import { TId } from '@helpersTypes/id';
import { TCrudModel } from '@helpersTypes/crud';

import { MySQLDatabase } from '../mysqlDatabase';
import DatabaseError from '../errors/DatabaseError';

abstract class AbstractCrudModel<
  TGeneralModel extends {},
  TInputCreate extends {},
  TInputUpdate extends { id: TId },
> implements TCrudModel<TGeneralModel, TInputCreate, TInputUpdate>
{
  protected tableName: string;
  protected mysqlDB: MySQLDatabase;

  constructor(tableName: string) {
    this.tableName = tableName;
    this.mysqlDB = MySQLDatabase.getInstance();
  }

  protected throwDatabaseError(message: string, status: number): never {
    throw new DatabaseError(message, status);
  }

  async create(data: TInputCreate): Promise<TId> {
    const values = Object.values(data);
    const keys = Object.keys(data).join(', ');
    const valuesPlaceholder = Array.from({ length: values.length }, () => '?').join(',');
    const sql = `INSERT INTO ${this.tableName} (${keys}) VALUES(${valuesPlaceholder})`;

    try {
      const result = await this.mysqlDB.executeQuery<ResultSetHeader>(sql, values);

      return result.insertId;
    } catch (error) {
      this.throwDatabaseError(`Failed to create ${this.tableName}.\n${error}`, 500);
    }
  }

  async readById<T>(id: TId, columnsForSelect: (keyof TGeneralModel)[]): Promise<T> {
    const sql = `SELECT ${columnsForSelect.join(', ')} FROM ${this.tableName} WHERE id = ?`;

    try {
      const result = await this.mysqlDB.executeQuery<T & RowDataPacket>(sql, [id]);

      if (!result.length) this.throwDatabaseError('Not found', 404);

      return result[0];
    } catch (error) {
      this.throwDatabaseError(`Failed to get by Id.\n${error}`, 500);
    }
  }

  async read<T>(
    conditions: Partial<TGeneralModel>,
    columnsForSelect: (keyof TGeneralModel)[],
  ): Promise<T[]> {
    const keys = Object.keys(conditions);
    const values = Object.values(conditions);
    const params = keys.map(key => `${key} = ?`).join(' AND ');
    const sql = `SELECT ${columnsForSelect.join(', ')} FROM ${this.tableName}${
      keys?.length ? ` WHERE ${params}` : ''
    }`;

    try {
      const result = await this.mysqlDB.executeQuery<T & RowDataPacket>(sql, values);

      return result;
    } catch (error) {
      this.throwDatabaseError(`Failed to find in ${this.tableName}.\n${error}`, 500);
    }
  }

  async update(data: Partial<TInputUpdate>): Promise<TId> {
    const { id, ...updateData } = data;
    const updateFields = Object.keys(updateData)
      .map(key => `${key} = ?`)
      .join(', ');
    const sql = `UPDATE ${this.tableName} SET ${updateFields} WHERE id = ?`;

    try {
      const result = await this.mysqlDB.executeQuery<ResultSetHeader>(sql, [
        ...Object.values(updateData),
        id,
      ]);

      if (!result.affectedRows) this.throwDatabaseError('Not found', 404);

      return id as TId;
    } catch (error) {
      this.throwDatabaseError(`Failed to update ${this.tableName}.\n${error}`, 500);
    }
  }

  async deleteById(id: TId): Promise<TId> {
    if (!id) this.throwDatabaseError('Id not set', 404);

    const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;

    try {
      const result = await this.mysqlDB.executeQuery<ResultSetHeader>(sql, [id]);

      if (!result.affectedRows) this.throwDatabaseError('Not found', 404);
    } catch (error) {
      this.throwDatabaseError(`Failed to delete.\n${error}`, 500);
    }

    return id;
  }
}

export default AbstractCrudModel;
