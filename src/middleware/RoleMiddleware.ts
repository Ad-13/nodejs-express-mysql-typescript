import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import * as Errors from '@app/errors';
import { AuthenticatedRequest } from '@app/types';
import { UserDto } from '@app/dtos/UserDto';
import { ERoles } from '@root/enums/ERoles';

export const roleMiddleware = (roles: ERoles[]) => (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') next();

  if (!req.headers.authorization) throw new Errors.UnauthorizedError();

  const token = req.headers.authorization.split(' ')[1];

  if (!token) throw new Errors.UnauthorizedError();

  const { roles: userRoles } = jwt.verify(token, String(process.env.JWT_ACCESS_SECRET)) as UserDto;
  const hasRole = userRoles.some(role => role === ERoles.Admin || roles.includes(role));

  if (!hasRole) throw new Errors.UnauthorizedError({ message: 'Access denied'});

  next();
};
