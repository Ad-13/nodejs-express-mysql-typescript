import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import * as Errors from '@errors/index';

import { ERoles } from '@enums/ERoles';
import { TRequest } from '@helpersTypes/expressTypes';
import { TOutputUser } from '@helpersTypes/user';

export const roleMiddleware =
  (roles: ERoles[] = []) =>
  (req: TRequest, _res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') next();

    if (!req.headers.authorization) throw new Errors.UnauthorizedError();

    const token = req.headers.authorization.split(' ')[1];

    if (!token) throw new Errors.UnauthorizedError();

    const { roles: userRoles } = jwt.verify(
      token,
      String(process.env.JWT_ACCESS_SECRET),
    ) as TOutputUser;
    const hasRole = userRoles.some(role => role === ERoles.Admin || roles.includes(role));

    if (!hasRole) throw new Errors.UnauthorizedError({ message: 'Access denied' });

    next();
  };
