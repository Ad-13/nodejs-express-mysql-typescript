import { ResultSetHeader } from 'mysql2';

import { ETables } from '@enums/ETables';
import { TToken, TInputCreateToken, TInputUpdateToken } from '@helpersTypes/token';
import { TId } from '@helpersTypes/id';

import AbstractCrudModel from './AbstractCrudModel';

class TokenModel extends AbstractCrudModel<TToken, TInputCreateToken, TInputUpdateToken> {
  constructor() {
    super(ETables.Tokens);
  }

  public create = async (data: TInputCreateToken): Promise<TId> => {
    try {
      const { userId, refreshToken } = data;
      const expiresAt = new Date();
      expiresAt.setMinutes(
        expiresAt.getMinutes() + Number.parseInt(process.env.JWT_REFRESH_EXPIRES!),
      );

      const sql = `INSERT INTO ${this.tableName} (userId, refreshToken, expiresAt) VALUES (?, ?, ?)`;
      const result = await this.mysqlDB.executeQuery<ResultSetHeader>(sql, [
        userId,
        refreshToken,
        expiresAt,
      ]);

      return result.insertId;
    } catch (error) {
      this.throwDatabaseError(`Failed to create ${this.tableName}`, 500);
    }
  };

  public update = async (data: TInputUpdateToken): Promise<TId> => {
    try {
      const { refreshToken, id } = data;

      if (!id) {
        this.throwDatabaseError('Invalid data: id is missing', 400);
      }

      const expiresAt = new Date();
      expiresAt.setMinutes(
        expiresAt.getMinutes() + Number.parseInt(process.env.JWT_REFRESH_EXPIRES!),
      );

      const sql = `UPDATE ${this.tableName} SET refreshToken = ?, expiresAt = ? WHERE id = ?`;
      const result = await this.mysqlDB.executeQuery<ResultSetHeader>(sql, [
        refreshToken,
        expiresAt,
        id,
      ]);

      if (!result.affectedRows) this.throwDatabaseError('Not found', 404);

      return result.insertId;
    } catch (error) {
      this.throwDatabaseError(`Failed to update ${this.tableName}`, 500);
    }
  };

  public deleteToken = async (refreshToken: string): Promise<void> => {
    try {
      const sql = `DELETE FROM ${this.tableName} WHERE refreshToken = ?`;
      const result = await this.mysqlDB.executeQuery<ResultSetHeader>(sql, [refreshToken]);

      if (!result.affectedRows) this.throwDatabaseError('Not found', 404);
    } catch (error) {
      this.throwDatabaseError(`Failed to delete: ${refreshToken}`, 500);
    }
  };

  public deleteExpiredTokens = async (): Promise<void> => {
    try {
      const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const sql = `DELETE FROM ${this.tableName} WHERE expiresAt < ?`;
      await this.mysqlDB.executeQuery<ResultSetHeader>(sql, [currentDate]);
    } catch (error) {
      this.throwDatabaseError('Failed to delete expired tokens', 500);
    }
  };
}

export default new TokenModel();
