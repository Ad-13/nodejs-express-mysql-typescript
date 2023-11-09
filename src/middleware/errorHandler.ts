import { Request, Response } from "express";
import logger from '@root/logger';

import { CustomError } from "@app/errors/CustomError";

export const errorHandler = (err: Error, _req: Request, res: Response) => {
  // Handled errors
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

  // Unhandled errors
  console.error(JSON.stringify(err, null, 2));
  return res.status(500).send({ errors: [{ message: "Something went wrong" }] });
};