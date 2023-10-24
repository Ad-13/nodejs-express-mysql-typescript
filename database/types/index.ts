import { RowDataPacket } from 'mysql2';

import { TCar, TCarPart, TClient, TSeller, TUser } from '../../types';

export type TDatabaseStringType = 'mysql' | 'mongo' | string | undefined;

export type TCarRowDataPacket = RowDataPacket & TCar

export type TCarPartRowDataPacket = RowDataPacket & TCarPart

export type TUserRowDataPacket = RowDataPacket & TUser

export type TSellerRowDataPacket = RowDataPacket & TSeller

export type TClientRowDataPacket = RowDataPacket & TClient

export interface IDatabase {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

export interface IMySQLDatabase extends IDatabase {
  executeQuery<T>(query: string, values?: any[]): Promise<T | T[]>;
  testConnection(): Promise<boolean>;
}
