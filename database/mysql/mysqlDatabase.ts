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
      this.connection = await mysql.createConnection(databaseConfig);
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

  async executeQuery<T extends RowDataPacket>(query: string, values?: any[]): Promise<T[]>;
  async executeQuery<T extends ResultSetHeader>(query: string, values?: any[]): Promise<T>;
  async executeQuery<T>(query: string, values?: any[]): Promise<T | T[]> {
    if (!this.connection) {
      throw new DatabaseError('Database is not connected', 500);
    }

    try {
      const isSelectQuery = query.trim().startsWith('SELECT');

      if (isSelectQuery) {
        const [rows] = await this.connection.query(query, values);
        return rows as T[];
      }

      const [result] = await this.connection.query(query, values);
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

// async queryRows(query: string, values: any[]): Promise<RowDataPacket[]> {
//   if (!this.connection) {
//     throw new Error('Database is not connected');
//   }

//   try {
//     const [rows] = await this.connection.query<RowDataPacket[]>(query, values);
//     return rows;
//   } catch (error) {
//     throw new Error('Failed to queryRows');
//   }
// }

// async queryRowsAsArray(query: string, values: any[]): Promise<RowDataPacket[][]> {
//   if (!this.connection) {
//     throw new Error('Database is not connected');
//   }

//   try {
//     const [rows] = await this.connection.query<RowDataPacket[][]>(query, values);
//     return rows;
//   } catch (error) {
//     throw new Error('Failed to queryRows');
//   }
// }

// async queryResult(query: string, values: any[]): Promise<ResultSetHeader> {
//   if (!this.connection) {
//     throw new Error('Database is not connected');
//   }

//   try {
//     const [rows] = await this.connection.query<ResultSetHeader>(query, values);
//     return rows;
//   } catch (error) {
//     throw new Error('Failed to queryRows');
//   }
// }

// async queryResults(query: string, values: any[]): Promise<ResultSetHeader[]> {
//   if (!this.connection) {
//     throw new Error('Database is not connected');
//   }

//   try {
//     const [rows] = await this.connection.query<ResultSetHeader[]>(query, values);
//     return rows;
//   } catch (error) {
//     throw new Error('Failed to queryRows');
//   }
// }
