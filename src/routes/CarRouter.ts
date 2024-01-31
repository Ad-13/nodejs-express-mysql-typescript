import CarController from '@controllers/CarController';

import { TCar, TInputCreateCar, TInputUpdateCar, TOutputCar } from '@helpersTypes/car';

import CrudRouter from './CrudRouter';

class CarRouter extends CrudRouter<TCar, TInputCreateCar, TInputUpdateCar, TOutputCar> {
  constructor() {
    super(CarController);
  }

  protected initRoutes(): void {
    this.router.post('/', this.routeController.create);
    this.router.get('/:id', this.routeController.getById);
    this.router.get('/', this.routeController.getAll);
    this.router.put('/:id', this.routeController.update);
    this.router.delete('/:id', this.routeController.deleteById);
  }
}

export default new CarRouter().getRouter();
