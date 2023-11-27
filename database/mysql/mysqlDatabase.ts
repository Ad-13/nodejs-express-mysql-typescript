import mysql, { Connection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';

import DatabaseError from './errors/DatabaseError';
import { databaseConfig } from './databaseConfig';
import { IMySQLDatabase } from '../types';

export class MySQLDatabase implements IMySQLDatabase {
  private static instance: MySQLDatabase | null = null;
  private connection: Connection | null = null;

  // for avoiding creating a new instance from outside
  private constructor() {}

  public static getInstance(): MySQLDatabase {
    if (!MySQLDatabase.instance) {
      MySQLDatabase.instance = new MySQLDatabase();
    }
    return MySQLDatabase.instance;
  }

  async connect(): Promise<void> {
    if (this.connection) return;

    try {
      this.connection = await mysql.createPool(databaseConfig);
    } catch (error) {
      console.error('Failed to connect to the database:', error);
      throw new DatabaseError('Failed to connect to the database', 500);
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (this.connection) await this.connection.destroy();
      this.connection = null;
    } catch (error) {
      console.error('Failed to disconnect from the database:', error);
      throw new DatabaseError('Failed to disconnect from the database', 500);
    }
  }

  getConnection(): Connection {
    if (!this.connection) throw new DatabaseError('Database is not connected', 500);

    return this.connection;
  }

  async executeQuery<T extends RowDataPacket>(query: string, values?: any[]): Promise<T[]>;
  async executeQuery<T extends ResultSetHeader>(query: string, values?: any[]): Promise<T>;
  async executeQuery<T>(query: string, values?: any[]): Promise<T | T[]> {
    if (!this.connection) {
      throw new DatabaseError('Database is not connected', 500);
    }

    try {
      const isSelectQuery = /^\s*SELECT\s+/i.test(query);

      if (isSelectQuery) {
        const [rows] = await this.connection.execute(query, values);
        return rows as T[];
      }

      const [result] = await this.connection.execute(query, values);
      return result as T;
    } catch (error) {
      throw new DatabaseError(`Failed to executeQuery: ${(error as Error).message}`, 500);
    }
  }

  async testConnection(): Promise<boolean> {
    if (!this.connection) {
      throw new DatabaseError('Database is not connected', 500);
    }

    try {
      const [rows] = await this.connection.execute<RowDataPacket[]>('SELECT 1');
      if (rows.length === 1 && rows[0][1] === 1) {
        console.log('Connection to the database established successfully.');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to test the database connection:', error);
      throw new DatabaseError('Failed to test the database connection', 500);
    }
  }
}
