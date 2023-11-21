import { body } from 'express-validator';

import BaseRouter from './BaseRouter';
import AuthController from '@app/controllers/AuthController';

class AuthRouter extends BaseRouter<AuthController> {
  constructor() {
    super(AuthController);
  }

  protected initRoutes(): void {
    this.router.post(
      '/registration',
      body('email').isEmail(),
      body('password').isLength({ min: 3, max: 32 }),
      this.routeController.registrate,
    );
    this.router.post('/login', this.routeController.login);
    this.router.post('/logout', this.routeController.logout);
    this.router.get('/activate/:link', this.routeController.activate);
    this.router.get('/refresh', this.routeController.refresh);
  }
}

export default new AuthRouter().getRouter();
