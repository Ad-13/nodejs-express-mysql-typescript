import { ResultSetHeader } from 'mysql2/promise';

import AbstractModel from './AbstractModel';
import { MySQLDatabase } from '../mysqlDatabase';
import { TCar } from '../../types';
import { TId } from '../../../types';
import { ETables } from '../../utils/tables';

class CarModel extends AbstractModel {
  private mysqlDB: MySQLDatabase;

  constructor() {
    super(ETables.Cars);
    this.mysqlDB = MySQLDatabase.getInstance();
  }

  async create(data: Partial<TCar>): Promise<Partial<TCar>> {
    try {
      const sql = 'INSERT INTO ?? (make, model, year) VALUES(?,?,?)';

      const result = await this.mysqlDB.executeQuery<ResultSetHeader>(sql, [
        this.tableName,
        data.make,
        data.model,
        data.year,
      ]);

      const createdItem = await this.readById(result.insertId);

      return createdItem;
    } catch (error) {
      this.throwDatabaseError('Failed to create a car', 500);
    }
  }

  async readById(id: TId): Promise<Partial<TCar>> {
    try {
      const sql = 'SELECT * FROM ?? WHERE id = ?';
      const result = await this.mysqlDB.executeQuery<TCar>(sql, [this.tableName, id]);

      if (!result.length) this.throwDatabaseError('Car not found', 404);

      return result[0];
    } catch (error) {
      this.throwDatabaseError(`Failed to get a car by Id: ${id}`, 500);
    }
  }

  async read(conditions: Partial<TCar>): Promise<TCar[]> {
    try {
      const sql = 'SELECT * FROM ?? WHERE ?';
      const result = await this.mysqlDB.executeQuery<TCar>(sql, [this.tableName, { ...conditions }]);
      return result;
    } catch (error) {
      this.throwDatabaseError(`Failed to find cars: ${conditions}`, 500);
    }
  }

  async update(data: Partial<TCar>): Promise<Partial<TCar>> {
    try {
      const sql = 'UPDATE ?? SET ? WHERE id = ?';
      const result = await this.mysqlDB.executeQuery<ResultSetHeader>(sql, [this.tableName, data, data.id]);

      if (!result.affectedRows) this.throwDatabaseError('Car not found', 404);

      const updatedResult = await this.readById(result.insertId);

      return updatedResult;
    } catch (error) {
      this.throwDatabaseError(`Failed to update car: ${data.id}`, 500);
    }
  }

  async delete(id: TId): Promise<TId> {
    try {
      const sql = 'DELETE FROM ?? WHERE id = ?';
      const result = await this.mysqlDB.executeQuery<ResultSetHeader>(sql, [this.tableName, id]);

      if (!result.affectedRows) this.throwDatabaseError('Car not found', 404);

      return id;
    } catch (error) {
      this.throwDatabaseError(`Failed to delete car: ${error.message}`, 500);
    }
  }
}

export default CarModel;
