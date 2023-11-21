import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import authService from '@app/services/AuthService';

import * as Errors from '@app/errors';

import { TUser } from '@root/types';
import { TAuthController, TUserLoginData } from '@app/types';

const maxCookieAge = 30 * 24 * 60 * 60 * 1000;

class AuthController implements TAuthController {
  async registrate(req: Request<{}, {}, Partial<TUser>>, res: Response<TUserLoginData>): Promise<void> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new Errors.ValidationError({ message: 'Validation Error', context: errors.array() });
    }

    const { email, password } = req.body;

    const userData = await authService.registrate(email!, password!);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: maxCookieAge, httpOnly: true });
    res.json(userData);
  }

  async login(req: Request<{}, {}, Partial<TUser>>, res: Response<TUserLoginData>): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) throw new Errors.ValidationError();

    const userData = await authService.login(email, password);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: maxCookieAge, httpOnly: true });
    res.json(userData);
  }

  async logout(req: Request<{}, {}, Partial<TUser>>, res: Response<string>): Promise<void> {
    const { refreshToken } = req.cookies;
    const token = await authService.logout(refreshToken);
    res.clearCookie('refreshToken');
    res.json(token);
  }

  async activate(req: Request<{ link: string }>, res: Response): Promise<void> {
    const activationLink = req.params.link;
    await authService.activate(activationLink);
    res.redirect(process.env.CLIENT_URL!);
  }

  async refresh(req: Request, res: Response<TUserLoginData>): Promise<void> {
    const { refreshToken } = req.cookies;
    const userData = await authService.refresh(refreshToken as string);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: maxCookieAge, httpOnly: true });
    res.json(userData);
  }
}

export default AuthController;
