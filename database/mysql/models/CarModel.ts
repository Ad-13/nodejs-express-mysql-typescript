import AbstractModel from './AbstractModel';
import { MySQLDatabase } from '../mysqlDatabase';
import { TCar } from '../../types';
import { ETables } from '../../utils/tables';

class CarModel extends AbstractModel<TCar> {
  protected mysqlDB: MySQLDatabase;
  protected columnsForCreate = ['make', 'model', 'year'];

  constructor() {
    super(ETables.Cars);
    this.mysqlDB = MySQLDatabase.getInstance();
  }
}

export default CarModel;
