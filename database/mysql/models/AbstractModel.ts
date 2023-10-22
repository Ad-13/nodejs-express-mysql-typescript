import { TId } from '../../../types';
import DatabaseError from '../errors/DatabaseError';

abstract class AbstractModel {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  protected throwDatabaseError(message: string, status: number): never {
    throw new DatabaseError(message, status);
  }

  abstract create(data: Record<string, any>): Promise<Record<string, any>>;

  abstract readById(id: TId): Promise<Record<string, any>>;

  abstract read(conditions: Record<string, any>): Promise<Record<string, any>[]>;

  abstract update(data: Record<string, any>): Promise<Record<string, any>>;

  abstract delete(id: TId): Promise<TId>;
}

export default AbstractModel;
