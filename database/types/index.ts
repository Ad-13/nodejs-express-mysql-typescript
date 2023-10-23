import { RowDataPacket } from 'mysql2';

import { TId } from '../../types';

export type TDatabaseStringType = 'mysql' | 'mongo' | string | undefined;

export type TCar = RowDataPacket & {
  id: TId
  make: string
  model: string
  year: number
}

export type TCarPart = RowDataPacket & {
  id: TId
  car_id: TId
  name: string
  price: number
}

export type TUser = RowDataPacket & {
  id: TId
  name: string
  email: string
  password: string
}

export type TSeller = RowDataPacket & {
  id: TId
  name: string
  email: string
  password: string
}

export type TClient = RowDataPacket & {
  id: TId
  name: string
  email: string
  password: string
}

export interface IDatabase {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

export interface IMySQLDatabase extends IDatabase {
  executeQuery<T>(query: string, values?: any[]): Promise<T | T[]>;
  testConnection(): Promise<boolean>;
}
