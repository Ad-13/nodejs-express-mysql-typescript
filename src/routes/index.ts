import { Application } from 'express';

import { authMiddleware } from '@middlewares/AuthMiddleware';
import { roleMiddleware } from '@middlewares/RoleMiddleware';

import authRouter from '@routes/AuthRouter';
import userRouter from '@routes/UserRouter';
import carRouter from '@routes/CarRouter';

import { ERoles } from '@enums/ERoles';

export default class Routes {
  constructor(app: Application) {
    app.use('/api/auth', authRouter);
    app.use('/api/users', authMiddleware, roleMiddleware([ERoles.Client]), userRouter);
    app.use('/api/cars', authMiddleware, roleMiddleware([ERoles.Client]), carRouter);
  }
}
