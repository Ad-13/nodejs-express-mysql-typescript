import { ResultSetHeader } from 'mysql2';

import AbstractCrudModel from './AbstractCrudModel';
import { ETables } from '@root/enums/ETables';
import { TToken } from '@root/types';

class TokenModel extends AbstractCrudModel<TToken> {
  protected columnsForCreate = ['userId', 'refreshToken', 'expiresAt'];

  constructor() {
    super(ETables.Tokens);
  }

  async create(data: Partial<TToken>): Promise<TToken> {
    try {
      const { userId, refreshToken } = data;
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + Number.parseInt(process.env.JWT_REFRESH_EXPIRES!));

      const sql = 'INSERT INTO ?? (userId, refreshToken, expiresAt) VALUES (?, ?, ?)';
      const result = await this.mysqlDB.executeQuery<ResultSetHeader>(sql, [
        this.tableName,
        userId,
        refreshToken,
        expiresAt,
      ]);

      const createdItem = await this.readById(result.insertId);

      return createdItem;
    } catch (error) {
      this.throwDatabaseError(`Failed to create ${this.tableName}`, 500);
    }
  }

  async update(data: Partial<TToken>): Promise<TToken> {
    try {
      const { refreshToken, id } = data;
    
      if (!id) {
        this.throwDatabaseError('Invalid data: id is missing', 400);
      }

      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + Number.parseInt(process.env.JWT_REFRESH_EXPIRES!));
  
      const sql = 'UPDATE ?? SET refreshToken = ?, expiresAt = ? WHERE id = ?';
      const result = await this.mysqlDB.executeQuery<ResultSetHeader>(sql, [
        this.tableName,
        refreshToken,
        expiresAt,
        id,
      ]);
  
      if (!result.affectedRows) this.throwDatabaseError('Not found', 404);
  
      const updatedItem = await this.readById(id);
      return updatedItem;
    } catch (error) {
      this.throwDatabaseError(`Failed to update ${this.tableName}`, 500);
    }
  }

  async deleteToken(refreshToken: string): Promise<string> {
    try {
      const sql = 'DELETE FROM ?? WHERE refreshToken = ?';
      const result = await this.mysqlDB.executeQuery<ResultSetHeader>(sql, [this.tableName, refreshToken]);

      if (!result.affectedRows) this.throwDatabaseError('Not found', 404);

      return refreshToken;
    } catch (error) {
      this.throwDatabaseError(`Failed to delete: ${refreshToken}`, 500);
    }
  }

  async deleteExpiredTokens(): Promise<void> {
    try {
      const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const sql = 'DELETE FROM ?? WHERE expiresAt < ?';
      await this.mysqlDB.executeQuery<ResultSetHeader>(sql, [this.tableName, currentDate]);
    } catch (error) {
      this.throwDatabaseError('Failed to delete expired tokens', 500);
    }
  }
}

export default new TokenModel();
