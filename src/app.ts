import dotenv from 'dotenv';

dotenv.config({ path: './config/.env' });

import express, { Application } from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

import { createDatabaseInstance } from '@root/database/utils/createDatabaseInstance';
import userRouter from '@app/routes/UserRouter';

const db = createDatabaseInstance(process.env.DB_TYPE);
const app: Application = express();
const port = process.env.PORT || 7000;

app.use(bodyParser.json());

// Routes
app.use('/api', userRouter);

// Другие маршруты и настройки могут быть добавлены здесь

const start = async (): Promise<void> => {
  try {
    await db.connect();
    const isConnected = await db.testConnection();
    console.log(isConnected ? 'Connection to the database established successfully.' : 'Connection to the database established successfully.');

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
