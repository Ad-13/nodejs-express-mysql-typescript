import { NextFunction, Request, Response } from "express";
import logger from '@root/logger';

import { CustomError } from "@app/errors/CustomError";

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof CustomError) {
    const { statusCode, errors, logging } = err;

    if(logging) logger.error(err);

    console.error(JSON.stringify({
      code: err.statusCode,
      errors: err.errors,
      stack: err.stack,
    }, null, 2));

    return res.status(statusCode).send({ errors });
  }
  
  if (err.message === 'Converting circular structure to JSON') {
    return res.status(500).send({ errors: [{ message: "Circular structure error" }] });
  }

  console.error(JSON.stringify({
    message: err.message,
    stack: err.stack,
  }, null, 2));

  return res.status(500).send({ errors: [{ message: "Something went wrong" }] });
};
