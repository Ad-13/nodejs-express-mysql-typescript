import { NextFunction, Response } from 'express';

import * as Errors from '@app/errors';
import tokenService from '@app/services/TokenService';
import { AuthenticatedRequest } from '@app/types';

export const authMiddleware = (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') next();

  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) throw new Errors.UnauthorizedError();

  const accessToken = authorizationHeader.split(' ')[1];
  if (!accessToken) throw new Errors.UnauthorizedError();

  const userData = tokenService.validateAccessToken(accessToken);
  if (!userData) throw new Errors.UnauthorizedError();

  req.user = userData;
  next();
};
