import mysql, { Connection, RowDataPacket } from 'mysql2/promise';

import { IMySQLDatabase } from './types';

export class MySQLDatabase implements IMySQLDatabase {
  private connection: Connection | null = null;

  async connect(): Promise<void> {
    if (this.connection) return;

    try {
      this.connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
    } catch (error) {
      console.error('Failed to connect to the database:', error);
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (this.connection) await this.connection.end();
      this.connection = null;
    } catch (error) {
      console.error('Failed to disconnect from the database:', error);
    }
  }

  async executeQuery<T>(query: string): Promise<T[]> {
    if (!this.connection) {
      throw new Error('Database is not connected');
    }

    try {
      const [rows] = await this.connection.query<RowDataPacket[]>(query);
      return rows as T[];
    } catch (error) {
      throw new Error('Failed to executeQuery');
    }
  }

  async testConnection(): Promise<boolean> {
    if (!this.connection) {
      throw new Error('Database is not connected');
    }

    try {
      const [rows] = await this.connection.query<RowDataPacket[]>('SELECT 1');
      if (rows.length === 1 && rows[0][1] === 1) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}
