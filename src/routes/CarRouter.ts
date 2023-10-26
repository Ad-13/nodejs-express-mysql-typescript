import BaseRouter from './BaseRouter';
import CarController from '../controllers/CarController';
import { TCar } from '@root/types';

class CarRouter extends BaseRouter<TCar> {
  constructor() {
    super(CarController);
  }

  protected initRoutes(): void {
    this.router.post('/cars', this.routeController.create);
    this.router.get('/cars/:id', this.routeController.getById);
    this.router.get('/cars', this.routeController.getAll);
    this.router.put('/cars/:id', this.routeController.update);
    this.router.delete('/cars/:id', this.routeController.delete);
  }
}

export default new CarRouter().getRouter();
