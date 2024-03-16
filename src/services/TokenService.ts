import jwt from 'jsonwebtoken';

import tokenModel from '@db/mysql/models/TokenModel';

import * as Errors from '@errors/index';

import { TOutputUser } from '@helpersTypes/user';
import { TTokens, TToken, TInputUpdateToken, TInputCreateToken } from '@helpersTypes/token';
import { TId } from '@helpersTypes/id';

class TokenService {
  generateTokens(payload: string | Buffer | object): TTokens {
    const accessToken = jwt.sign(payload, String(process.env.JWT_ACCESS_SECRET), {
      expiresIn: process.env.JWT_ACCESS_EXPIRES,
    });
    const refreshToken = jwt.sign(payload, String(process.env.JWT_REFRESH_SECRET), {
      expiresIn: process.env.JWT_REFRESH_EXPIRES,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token: string): TOutputUser {
    try {
      const userData = jwt.verify(token, String(process.env.JWT_ACCESS_SECRET));
      return userData as TOutputUser;
    } catch (error: any) {
      throw new Errors.UnauthorizedError({ message: error.message });
    }
  }

  validateRefreshToken(token: string): TOutputUser {
    try {
      const userData = jwt.verify(token, String(process.env.JWT_REFRESH_SECRET));
      return userData as TOutputUser;
    } catch (error) {
      throw new Errors.UnauthorizedError();
    }
  }

  // TODO: do not forget to use Kubernetes to delete expired tokens
  async saveToken(data: TInputCreateToken): Promise<TId> {
    try {
      return tokenModel.create(data);
    } catch (error) {
      throw new Errors.BadRequestError();
    }
  }

  async updateToken(data: TInputUpdateToken): Promise<TId> {
    try {
      return tokenModel.update(data);
    } catch (error) {
      throw new Errors.BadRequestError();
    }
  }

  async removeToken(refreshToken: string): Promise<void> {
    try {
      return await tokenModel.deleteToken(refreshToken);
    } catch (error) {
      throw new Errors.NotFoundError();
    }
  }

  async findToken(refreshToken: string): Promise<TToken> {
    const tokenData = await tokenModel.read<TToken>({ refreshToken }, [
      'id',
      'refreshToken',
      'expiresAt',
      'userId',
    ]);
    return tokenData[0];
  }
}

export default new TokenService();
