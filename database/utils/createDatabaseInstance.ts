import { TDatabaseStringType } from '../types';
import { getDatabaseFactory } from './databaseFactories';

export function createDatabaseInstance(dbType: TDatabaseStringType) {
  const factory = getDatabaseFactory(dbType);

  if (!factory) {
    throw new Error(`Unsupported database type: ${dbType}`);
  }

  return factory();
}
