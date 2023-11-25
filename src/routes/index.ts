import { Application } from 'express';

import { authMiddleware } from '@app/middleware/AuthMiddleware';
import { roleMiddleware } from '@app/middleware/RoleMiddleware';

import { ERoles } from '@root/enums/ERoles';

import authRouter from '@app/routes/AuthRouter';
import userRouter from '@app/routes/UserRouter';
import roleRouter from '@app/routes/RoleRouter';
import sellerRouter from '@app/routes/SellerRouter';
import clientRouter from '@app/routes/ClientRouter';
import carRouter from '@app/routes/CarRouter';
import carPartRouter from '@app/routes/CarPartRouter';

export default class Routes {
  constructor(app: Application) {
    app.use('/api/auth', authRouter);
    app.use('/api/users', authMiddleware, roleMiddleware([ERoles.Client]), userRouter);
    app.use('/api/roles', authMiddleware, roleRouter);
    app.use('/api/sellers', sellerRouter);
    app.use('/api/clients', clientRouter);
    app.use('/api/cars', carRouter);
    app.use('/api/car-parts', carPartRouter);
  }
}
