import { ResultSetHeader, RowDataPacket } from 'mysql2';

import { TId } from '../../../types';
import { MySQLDatabase } from '../mysqlDatabase';
import DatabaseError from '../errors/DatabaseError';

abstract class AbstractModel<T extends RowDataPacket> {
  protected tableName: string;
  protected mysqlDB: MySQLDatabase;
  protected abstract columnsForCreate: string[];

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  protected throwDatabaseError(message: string, status: number): never {
    throw new DatabaseError(message, status);
  }

  protected async create(data: Partial<T>): Promise<Partial<T>> {
    try {
      const sql = `INSERT INTO ?? (${this.columnsForCreate.join(', ')}) VALUES(?,?,?)`;

      const result = await this.mysqlDB.executeQuery<ResultSetHeader>(sql, [
        this.tableName,
        data.email,
        data.password,
        data.name,
      ]);

      const createdItem = await this.readById(result.insertId);

      return createdItem;
    } catch (error) {
      this.throwDatabaseError(`Failed to create ${this.tableName}`, 500);
    }
  }

  protected async readById(id: TId): Promise<Partial<T>> {
    try {
      const sql = 'SELECT * FROM ?? WHERE id = ?';
      const result = await this.mysqlDB.executeQuery<T>(sql, [this.tableName, id]);

      if (!result.length) this.throwDatabaseError('Not found', 404);

      return result[0];
    } catch (error) {
      this.throwDatabaseError(`Failed to get by Id: ${id}`, 500);
    }
  }

  protected async read(conditions: Partial<T>): Promise<T[]> {
    try {
      const sql = 'SELECT * FROM ?? WHERE ?';
      const result = await this.mysqlDB.executeQuery<T>(sql, [this.tableName, { ...conditions }]);
      return result;
    } catch (error) {
      this.throwDatabaseError(`Failed to find in ${this.tableName}`, 500);
    }
  }

  protected async update(data: Partial<T>): Promise<Partial<T>> {
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

  protected async delete(id: TId): Promise<TId> {
    try {
      const sql = 'DELETE FROM ?? WHERE id = ?';
      const result = await this.mysqlDB.executeQuery<ResultSetHeader>(sql, [this.tableName, id]);

      if (!result.affectedRows) this.throwDatabaseError('Not found', 404);

      return id;
    } catch (error) {
      this.throwDatabaseError(`Failed to delete: ${this.tableName}: ${id}`, 500);
    }
  }
}

export default AbstractModel;
