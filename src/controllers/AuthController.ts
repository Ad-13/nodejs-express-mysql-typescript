import { Request, Response } from 'express';
import { check } from 'express-validator';

import authService from '@app/services/AuthService';

import * as Errors from '@app/errors';

import { validateExpressData } from '@app/utils/validateExpressData';
import { TUser } from '@root/types';
import { TAuthController, TUserLoginData } from '@app/types';

const maxCookieAge = 30 * 24 * 60 * 60 * 1000;

class AuthController implements TAuthController {
  private async validateRegistrateData(req: Request<{}, {}, Partial<TUser>>): Promise<void> {
    const rules = [
      check('email', 'Invalid email').notEmpty().isEmail(),
      check('password', 'Password is required').notEmpty().isLength({ min: 3, max: 32 }),
    ];

    validateExpressData(rules, req);
  }

  private async validateLoginData(req: Request<{}, {}, Partial<TUser>>): Promise<void> {
    const rules = [
      check('email', 'Invalid email').notEmpty().isEmail(),
      check('password', 'Password is required').notEmpty(),
    ];

    validateExpressData(rules, req);
  }

  async registrate(req: Request<{}, {}, Partial<TUser>>, res: Response<TUserLoginData>): Promise<void> {
    this.validateRegistrateData(req);

    const { email, password } = req.body;

    const userData = await authService.registrate(email!, password!);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: maxCookieAge, httpOnly: true });
    res.json(userData);
  }

  async login(req: Request<{}, {}, Partial<TUser>>, res: Response<TUserLoginData>): Promise<void> {
    this.validateLoginData(req);

    const { email, password } = req.body;

    const userData = await authService.login(email!, password!);
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
