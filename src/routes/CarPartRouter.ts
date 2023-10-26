import BaseRouter from './BaseRouter';
import CarPartController from '../controllers/CarPartController';
import { TCarPart } from '@root/types';

class CarPartRouter extends BaseRouter<TCarPart> {
  constructor() {
    super(CarPartController);
  }

  protected initRoutes(): void {
    this.router.post('/car-parts', this.routeController.create);
    this.router.get('/car-parts/:id', this.routeController.getById);
    this.router.get('/car-parts', this.routeController.getAll);
    this.router.put('/car-parts/:id', this.routeController.update);
    this.router.delete('/car-parts/:id', this.routeController.delete);
  }
}

export default new CarPartRouter().getRouter();
