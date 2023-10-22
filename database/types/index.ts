import { RowDataPacket } from 'mysql2';

export type TDatabaseStringType = 'mysql' | 'mongo' | string | undefined;

export interface IDatabase {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

export interface IMySQLDatabase extends IDatabase {
  executeQuery<T>(query: string, values?: any[]): Promise<T | T[]>;
  testConnection(): Promise<boolean>;
}

export type TUser = RowDataPacket & {
  id: number
  name: string
  email: string
  password: string
}
