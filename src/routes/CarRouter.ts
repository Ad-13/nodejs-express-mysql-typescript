import BaseRouter from './BaseRouter';
import CarController from '../controllers/CarController';
import { TCar } from '@root/types';

class CarRouter extends BaseRouter<TCar> {
  constructor() {
    super(CarController);
  }

  protected initRoutes(): void {
    this.router.post('/', this.routeController.create);
    this.router.get('/:id', this.routeController.getById);
    this.router.get('/', this.routeController.getAll);
    this.router.put('/:id', this.routeController.update);
    this.router.delete('/:id', this.routeController.delete);
  }
}

export default new CarRouter().getRouter();
