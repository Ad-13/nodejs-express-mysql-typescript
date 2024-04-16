import express, { Application } from 'express';
import 'express-async-errors';
import fileUpload from 'express-fileupload';
import cors, { CorsOptions } from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';

import { createDatabaseInstance } from '@db/utils/createDatabaseInstance';

import { errorMiddleware } from '@middlewares/ErrorMiddleware';

import Routes from '@routes/index';

import { TSyncDatabaseOptions } from '@helpersTypes/db';

import swaggerSpec from './swagger';

export default class Server {
  constructor(app: Application) {
    this.syncDatabase();
    this.config(app);
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      credentials: true,
      origin: process.env.CLIENT_URL,
    };

    app.use(cors(corsOptions));

    app.use(express.json());
    app.use(cookieParser());
    app.use(express.static(path.resolve(__dirname, 'static')));
    app.use(fileUpload({}));
    app.use(express.urlencoded({ extended: true }));
    new Routes(app);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use(errorMiddleware);
  }

  private async syncDatabase(options?: TSyncDatabaseOptions): Promise<void> {
    const db = createDatabaseInstance(process.env.DB_TYPE);
    await db.connect();
    if (options?.testConnection) await db.testConnection();
  }

  public start(app: Application, port: number): void {
    app
      .listen(port, function () {
        console.log(`Server is running on port ${port}.`);
      })
      .on('error', (err: Error & { code: string }) => {
        if (err.code === 'EADDRINUSE') {
          console.log('Error: address already in use');
        } else {
          console.log(err);
        }
      });
  }
}
