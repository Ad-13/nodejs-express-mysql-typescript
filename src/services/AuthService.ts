import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import uuid from 'uuid';

import mailService from './MailService';
import tokenService from './TokenService';

import * as Errors from '@app/errors';

import { ERoles } from '@root/enums/ERoles';
import userModel from '@root/database/mysql/models/UserModel';
import { UserDto } from '@app/dtos/UserDto';
import { TUserLoginData } from '@app/types';

const saltRounds = 3;

class AuthService {
  private readonly secretKey = process.env.AUTH_SECRET_KEY as string;
  private readonly expiresIn = process.env.JWT_ACCESS_EXPIRES as string;

  async registrate(email: string, password: string, sendMail?: boolean): Promise<TUserLoginData> {
    const candidate = await userModel.read({ email });
    if (candidate.length) {
      throw new Errors.BadRequestError({ message: `User with specified email already registered` });
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);
    const activationLink = uuid.v4();

    const user = await userModel.create({ email, password: hashPassword, activationLink, roles: [ERoles.Client]});

    if (sendMail) {
      await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken({ id: userDto.id, refreshToken: tokens.refreshToken });

    return { ...tokens, user: userDto };
  }

  async activate(activationLink: string): Promise<void> {
    const user = (await userModel.read({ activationLink }))[0];

    if (!user) {
      throw new Errors.BadRequestError({ message: `Wrong activation link` });
    }

    user.isActivated = true;
    await userModel.update(user);
  }

  async login(email: string, password: string): Promise<TUserLoginData> {
    const user = (await userModel.read({ email }))[0];
    if (!user) {
      throw new Errors.BadRequestError({ message: 'User not found' });
    }

    const isPassEquals = await bcrypt.compare(password, user.password!);
    if (!isPassEquals) {
      throw new Errors.BadRequestError({ message: 'Wrong password' });
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken({
      id: userDto.id,
      refreshToken: tokens.refreshToken,
    });

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken: string): Promise<string> {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string): Promise<TUserLoginData> {
    if (!refreshToken) throw new Errors.UnauthorizedError();

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) throw new Errors.UnauthorizedError();

    const user = await userModel.readById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken({
      id: userDto.id,
      refreshToken: tokens.refreshToken,
    });
    return { ...tokens, user: userDto };
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
