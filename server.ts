import dotenv from 'dotenv';
import express, { Application } from 'express';

import Server from './src/index';

dotenv.config({ path: './config/.env' });

const app: Application = express();
const server: Server = new Server(app);
const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

server.start(app, port);
