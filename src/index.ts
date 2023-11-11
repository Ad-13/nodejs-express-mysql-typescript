import express, { Application } from 'express';
import cors, { CorsOptions } from 'cors';
import 'express-async-errors';
import path from 'path';
// import cookieParser from 'cookie-parser';

import Routes from './routes';
import { createDatabaseInstance } from '@root/database/utils/createDatabaseInstance';
import { errorHandler } from './middleware/errorHandler';

export default class Server {
  constructor(app: Application) {
    this.config(app);
    this.syncDatabase();
    new Routes(app);
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: process.env.CORS_FOR_FRONT,
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.static(path.resolve(__dirname, 'static')));
    app.use(express.urlencoded({ extended: true }));
    app.use(errorHandler);
  }

  private async syncDatabase(): Promise<void> {
    const db = createDatabaseInstance(process.env.DB_TYPE);
    await db.connect();
    const isConnected = await db.testConnection();
    console.log(
      isConnected
        ? 'Connection to the database established successfully.'
        : 'Connection to the database established successfully.',
    );
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
