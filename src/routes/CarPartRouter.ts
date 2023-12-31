import CrudRouter from './CrudRouter';
import CarPartController from '../controllers/CarPartController';
import { TCarPart } from '@root/types';

class CarPartRouter extends CrudRouter<TCarPart> {
  constructor() {
    super(CarPartController);
  }

  protected initRoutes(): void {
    this.router.post('/', this.routeController.create);
    this.router.get('/:id', this.routeController.getById);
    this.router.get('/', this.routeController.getAll);
    this.router.put('/:id', this.routeController.update);
    this.router.delete('/:id', this.routeController.deleteById);
  }
}

export default new CarPartRouter().getRouter();
