import { DatabaseStringType, IDatabase, IMySQLDatabase } from '../types';
import { MySQLDatabase } from '../mysqlDatabase';

export const createMySQLDatabase: () => IMySQLDatabase = () => new MySQLDatabase();

export function getDatabaseFactory(dbType: DatabaseStringType) {
  switch (dbType) {
    case 'mysql':
      return createMySQLDatabase;
    default:
      return null;
  }
}
