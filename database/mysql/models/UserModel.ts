import { ResultSetHeader } from 'mysql2/promise';

import AbstractModel from './AbstractModel';
import { MySQLDatabase } from '../mysqlDatabase';
import { TUser } from '../../types';
import { TId } from '../../../types';
import { ETables } from '../../utils/tables';

class UserModel extends AbstractModel {
  private mysqlDB: MySQLDatabase;

  constructor() {
    super(ETables.Users);
    this.mysqlDB = MySQLDatabase.getInstance();
  }

  async create(data: Partial<TUser>): Promise<Partial<TUser>> {
    try {
      const sql = 'INSERT INTO ?? (email, password, name) VALUES(?,?,?)';

      const result = await this.mysqlDB.executeQuery<ResultSetHeader>(sql, [
        this.tableName,
        data.email,
        data.password,
        data.name,
      ]);

      const createdItem = await this.readById(result.insertId);

      return createdItem;
    } catch (error) {
      this.throwDatabaseError('Failed to create a user', 500);
    }
  }

  async readById(id: TId): Promise<Partial<TUser>> {
    try {
      const sql = 'SELECT * FROM ?? WHERE id = ?';
      const result = await this.mysqlDB.executeQuery<TUser>(sql, [this.tableName, id]);

      if (!result.length) this.throwDatabaseError('User not found', 404);

      return result[0];
    } catch (error) {
      this.throwDatabaseError(`Failed to get a user by Id: ${id}`, 500);
    }
  }

  async read(conditions: Partial<TUser>): Promise<TUser[]> {
    try {
      const sql = 'SELECT * FROM ?? WHERE ?';
      const result = await this.mysqlDB.executeQuery<TUser>(sql, [this.tableName, { ...conditions }]);
      return result;
    } catch (error) {
      this.throwDatabaseError(`Failed to find users: ${conditions}`, 500);
    }
  }

  async update(data: Partial<TUser>): Promise<Partial<TUser>> {
    try {
      const sql = 'UPDATE ?? SET ? WHERE id = ?';
      const result = await this.mysqlDB.executeQuery<ResultSetHeader>(sql, [this.tableName, data, data.id]);

      if (!result.affectedRows) this.throwDatabaseError('User not found', 404);

      const updatedResult = await this.readById(result.insertId);

      return updatedResult;
    } catch (error) {
      this.throwDatabaseError(`Failed to update user: ${data.id}`, 500);
    }
  }

  async delete(id: TId): Promise<TId> {
    try {
      const sql = 'DELETE FROM ?? WHERE id = ?';
      const result = await this.mysqlDB.executeQuery<ResultSetHeader>(sql, [this.tableName, id]);

      if (!result.affectedRows) this.throwDatabaseError('User not found', 404);

      return id;
    } catch (error) {
      this.throwDatabaseError(`Failed to delete user: ${error.message}`, 500);
    }
  }
}

export default UserModel;

// retrieveAll(searchParams: {title?: string, published?: boolean}): Promise<Tutorial[]> {
//   let query: string = "SELECT * FROM tutorials";
//   let condition: string = "";

//   if (searchParams?.published)
//     condition += "published = TRUE"

//   if (searchParams?.title)
//     condition += `LOWER(title) LIKE '%${searchParams.title}%'`

//   if (condition.length)
//     query += " WHERE " + condition;

//   return new Promise((resolve, reject) => {
//     connection.query<Tutorial[]>(query, (err, res) => {
//       if (err) reject(err);
//       else resolve(res);
//     });
//   });
// }

// const conditions: UserConditions = {
//   name: 'John',
//   age: 30,
// };

// try {
//   const users: TUser[] = await userModel.find(conditions);
//   console.log('Найденные пользователи:', users);
// } catch (error) {
//   console.error('Ошибка поиска пользователей:', error.message);
// }
