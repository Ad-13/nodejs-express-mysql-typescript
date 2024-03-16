import { check } from 'express-validator';

import authService from '@services/AuthService';

// import * as Errors from '@app/errors';

import { validateExpressData } from '@utils/validateExpressData';
import {
  TAuthController,
  TInputActivate,
  TInputLogin,
  TInputRegistrate,
  TOutputAuth,
} from '@helpersTypes/authController';
import { TRequest, TRequestWithParams, TResponse } from '@helpersTypes/expressTypes';

const maxCookieAge = 30 * 24 * 60 * 60 * 1000;

class AuthController implements TAuthController {
  private validateRegistrateData = async (req: TRequest<TInputRegistrate>): Promise<void> => {
    const rules = [
      check('email', 'Invalid email').notEmpty().isEmail(),
      check('password', 'Password is required').notEmpty().isLength({ min: 3, max: 32 }),
    ];

    await validateExpressData(rules, req);
  };

  private validateLoginData = async (req: TRequest<TInputLogin>): Promise<void> => {
    const rules = [
      check('email', 'Invalid email').notEmpty().isEmail(),
      check('password', 'Password is required').notEmpty(),
    ];

    await validateExpressData(rules, req);
  };

  public registrate = async (
    req: TRequest<TInputRegistrate>,
    res: TResponse<TOutputAuth>,
  ): Promise<void> => {
    await this.validateRegistrateData(req);

    const { email, password, name, telephone } = req.body;

    const userData = await authService.registrate({ email, password, name, telephone });

    res.cookie('refreshToken', userData.refreshToken, { maxAge: maxCookieAge, httpOnly: true });
    res.json({ accessToken: userData.accessToken });
  };

  public login = async (req: TRequest<TInputLogin>, res: TResponse<TOutputAuth>): Promise<void> => {
    await this.validateLoginData(req);

    const { email, password } = req.body;

    const userData = await authService.login(email, password);

    res.cookie('refreshToken', userData.refreshToken, { maxAge: maxCookieAge, httpOnly: true });
    res.json({ accessToken: userData.accessToken });
  };

  async logout(req: TRequest, res: TResponse): Promise<void> {
    const { refreshToken } = req.cookies;

    if (refreshToken) await authService.logout(refreshToken);

    res.clearCookie('refreshToken');
    res.json('ok');
  }

  async activate(req: TRequestWithParams<TInputActivate>, res: TResponse): Promise<void> {
    const activationLink = req.params.link;

    await authService.activate(activationLink);

    res.redirect(process.env.CLIENT_URL!);
  }

  async refresh(req: TRequest, res: TResponse<TOutputAuth>): Promise<void> {
    const { refreshToken } = req.cookies;

    const userData = await authService.refresh(refreshToken as string);

    res.cookie('refreshToken', userData.refreshToken, { maxAge: maxCookieAge, httpOnly: true });
    res.json({ accessToken: userData.accessToken });
  }
}

export default AuthController;
