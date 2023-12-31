import express, { Application } from 'express';
import cors, { CorsOptions } from 'cors';
import 'express-async-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';

import swaggerSpec from './swagger';
import Routes from './routes';
import { createDatabaseInstance } from '@root/database/utils/createDatabaseInstance';
import { errorMiddleware } from './middleware/ErrorMiddleware';

export default class Server {
  constructor(app: Application) {
    this.config(app);
    this.syncDatabase();
    this.setupSwagger(app);
    new Routes(app);
  }

  private setupSwagger(app: Application): void {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: process.env.CLIENT_URL,
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.static(path.resolve(__dirname, 'static')));
    app.use(express.urlencoded({ extended: true }));
    app.use(errorMiddleware);
  }

  private async syncDatabase(): Promise<void> {
    const db = createDatabaseInstance(process.env.DB_TYPE);
    await db.connect();
    await db.testConnection();
  }

  public start(app: Application, port: number): void {
    app
      .listen(port, function () {
        console.log(`Server is running on port ${port}.`);
      })
      .on('error', (err: any) => {
        if (err.code === 'EADDRINUSE') {
          console.log('Error: address already in use');
        } else {
          console.log(err);
        }
      });
  }
}
