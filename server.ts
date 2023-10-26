import dotenv from 'dotenv';

dotenv.config({ path: './config/.env' });

import express, { Application } from 'express';
import Server from './src/index';

const app: Application = express();
const server: Server = new Server(app);
const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

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
