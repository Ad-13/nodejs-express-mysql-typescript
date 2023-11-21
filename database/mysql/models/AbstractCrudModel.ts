import { ResultSetHeader, RowDataPacket } from 'mysql2';

import { TId, TCrudModel } from '../../../types';
import { MySQLDatabase } from '../mysqlDatabase';
import DatabaseError from '../errors/DatabaseError';

abstract class AbstractCrudModel<T> implements TCrudModel<T> {
  protected tableName: string;
  protected mysqlDB: MySQLDatabase;
  protected abstract columnsForCreate: string[];

  constructor(tableName: string) {
    this.tableName = tableName;
    this.mysqlDB = MySQLDatabase.getInstance();
  }

  protected throwDatabaseError(message: string, status: number): never {
    throw new DatabaseError(message, status);
  }

  async create(data: Partial<T>): Promise<T> {
    try {
      const sql = `INSERT INTO ?? (${this.columnsForCreate.join(', ')}) VALUES(?,?,?)`;

      const result = await this.mysqlDB.executeQuery<ResultSetHeader>(sql, [
        this.tableName,
        Object.values(data),
      ]);

      const createdItem = await this.readById(result.insertId);

      return createdItem;
    } catch (error) {
      this.throwDatabaseError(`Failed to create ${this.tableName}`, 500);
    }
  }

  async readById(id: TId): Promise<T> {
    try {
      const sql = 'SELECT * FROM ?? WHERE id = ?';
      const result = await this.mysqlDB.executeQuery<T & RowDataPacket>(sql, [this.tableName, id]);

      if (!result.length) this.throwDatabaseError('Not found', 404);

      return result[0];
    } catch (error) {
      this.throwDatabaseError(`Failed to get by Id: ${id}`, 500);
    }
  }

  async read(conditions: Partial<T>): Promise<T[]> {
    try {
      const sql = 'SELECT * FROM ?? WHERE ?';
      const result = await this.mysqlDB.executeQuery<T & RowDataPacket>(sql, [this.tableName, { ...conditions }]);
      return result;
    } catch (error) {
      this.throwDatabaseError(`Failed to find in ${this.tableName}`, 500);
    }
  }

  async update(data: Partial<T> & { id?: TId}): Promise<T> {
    try {
      const sql = 'UPDATE ?? SET ? WHERE id = ?';
      const result = await this.mysqlDB.executeQuery<ResultSetHeader>(sql, [this.tableName, data, data.id]);

      if (!result.affectedRows) this.throwDatabaseError('Not found', 404);

      const updatedResult = await this.readById(result.insertId);

      return updatedResult;
    } catch (error) {
      this.throwDatabaseError(`Failed to update ${this.tableName}: ${data.id}`, 500);
    }
  }

  async delete(id: TId): Promise<TId> {
    try {
      const sql = 'DELETE FROM ?? WHERE id = ?';
      const result = await this.mysqlDB.executeQuery<ResultSetHeader>(sql, [this.tableName, id]);

      if (!result.affectedRows) this.throwDatabaseError('Not found', 404);

      return result.insertId;
    } catch (error) {
      this.throwDatabaseError(`Failed to delete: ${id}`, 500);
    }
  }
}

export default AbstractCrudModel;
