import { NextFunction, Response } from 'express';

import tokenService from '@services/TokenService';

import * as Errors from '@errors/index';

import { TRequest } from '@helpersTypes/expressTypes';

export const authMiddleware = (req: TRequest, _res: Response, next: NextFunction) => {
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
