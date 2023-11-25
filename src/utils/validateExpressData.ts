import { Request } from "express";
import { ValidationChain, validationResult } from "express-validator";

import * as Errors from '@app/errors';

export async function validateExpressData (rules: ValidationChain[], req: Request): Promise<void> {
  await Promise.all(rules.map(validation => validation.run(req)));
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    throw new Errors.ValidationError({ context: errors.array() });
  }
}
