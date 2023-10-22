import { TId } from '../../../types';

abstract class AbstractModel {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  abstract create(data: Record<string, any>): Promise<Record<string, any>>;

  abstract read(conditions: Record<string, any>): Promise<Record<string, any>[]>;

  abstract update(data: Record<string, any>): Promise<Record<string, any>>;

  abstract delete(id: TId): Promise<TId>;
}

export default AbstractModel;
