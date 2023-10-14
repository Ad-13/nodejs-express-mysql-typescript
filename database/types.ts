export type DatabaseStringType = 'mysql' | 'mongo' | string | undefined;

export interface IDatabase {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

export interface IMySQLDatabase extends IDatabase {
  executeQuery<T>(query: string): Promise<T[]>;
  testConnection(): Promise<boolean>;
}
