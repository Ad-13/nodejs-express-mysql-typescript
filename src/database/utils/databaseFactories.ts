import { TDatabaseStringType, IMySQLDatabase } from '../types';
import { MySQLDatabase } from '../mysql/mysqlDatabase';

export const createMySQLDatabase: () => IMySQLDatabase = () => MySQLDatabase.getInstance();

export function getDatabaseFactory(dbType: TDatabaseStringType) {
  switch (dbType) {
    case 'mysql':
      return createMySQLDatabase;
    default:
      return null;
  }
}
