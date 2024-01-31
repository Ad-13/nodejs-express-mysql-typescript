import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';

import userModel from '@db/mysql/models/UserModel';

import * as Errors from '@errors/index';

import { ERoles } from '@enums/ERoles';
import { TOutputUser, TUser } from '@helpersTypes/user';
import { TTokens } from '@helpersTypes/token';
import { TInputRegistrate } from '@helpersTypes/authController';

import tokenService from './TokenService';
import mailService from './MailService';

const saltRounds = 3;

class AuthService {
  private readonly secretKey = process.env.AUTH_SECRET_KEY as string;
  private readonly expiresIn = process.env.JWT_ACCESS_EXPIRES as string;

  async registrate({ email, password, name, telephone }: TInputRegistrate): Promise<TTokens> {
    const candidate = await userModel.read({ email }, ['email']);
    if (candidate.length) {
      throw new Errors.BadRequestError({ message: 'User with specified email already registered' });
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);
    const activationLink = v4();
    const userId = await userModel.create({
      email,
      password: hashPassword,
      name,
      telephone,
      activationLink,
      roles: [ERoles.Client],
    });
    const user = await userModel.readById<TOutputUser>(userId, [
      'id',
      'name',
      'email',
      'roles',
      'isActivated',
    ]);
    const tokens = tokenService.generateTokens(user);

    await tokenService.saveToken({ userId: user.id, refreshToken: tokens.refreshToken });
    await mailService.sendActivationMail(
      email,
      `${process.env.SERVER_URL}/api/activate/${activationLink}`,
    );

    return { ...tokens };
  }

  async login(email: string, password: string): Promise<TTokens> {
    const { password: userPassword, ...user } = (
      await userModel.read<TUser>({ email }, [
        'id',
        'name',
        'email',
        'roles',
        'isActivated',
        'password',
      ])
    )[0];
    if (!user) {
      throw new Errors.NotFoundError({ message: 'User not found' });
    }

    const isPassEquals = await bcrypt.compare(password, userPassword);
    if (!isPassEquals) {
      throw new Errors.BadRequestError({ message: 'Wrong password' });
    }

    const tokens = tokenService.generateTokens(user);

    await tokenService.saveToken({ userId: user.id, refreshToken: tokens.refreshToken });

    return { ...tokens };
  }

  async logout(refreshToken: string): Promise<void> {
    tokenService.removeToken(refreshToken);
  }

  async activate(activationLink: string): Promise<void> {
    const user = (
      await userModel.read<Pick<TUser, 'id' | 'isActivated'>>({ activationLink }, [
        'id',
        'isActivated',
      ])
    )[0];

    if (!user) {
      throw new Errors.BadRequestError({ message: 'Wrong activation link' });
    }

    user.isActivated = true;
    await userModel.update(user);
  }

  async refresh(refreshToken: string): Promise<TTokens> {
    if (!refreshToken) throw new Errors.UnauthorizedError();

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) throw new Errors.UnauthorizedError();

    const user = await userModel.readById<TOutputUser>(userData.id, [
      'id',
      'name',
      'email',
      'roles',
      'isActivated',
    ]);
    const tokens = tokenService.generateTokens(user);

    await tokenService.updateToken({ id: tokenFromDb.id, refreshToken: tokens.refreshToken });

    return { ...tokens };
  }

  async generateToken(payload: object): Promise<string> {
    return jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn });
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

export default new AuthService();
