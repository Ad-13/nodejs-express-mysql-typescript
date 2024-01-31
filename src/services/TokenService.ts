import jwt from 'jsonwebtoken';

import tokenModel from '@db/mysql/models/TokenModel';

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
    const userData = jwt.verify(token, String(process.env.JWT_ACCESS_SECRET));
    return userData as TOutputUser;
  }

  validateRefreshToken(token: string): TOutputUser {
    const userData = jwt.verify(token, String(process.env.JWT_REFRESH_SECRET));
    return userData as TOutputUser;
  }

  // TODO: do not forget to use Kubernetes to delete expired tokens
  async saveToken(data: TInputCreateToken): Promise<TId> {
    return tokenModel.create(data);
  }

  async updateToken(data: TInputUpdateToken): Promise<TId> {
    return tokenModel.update(data);
  }

  async removeToken(refreshToken: string): Promise<void> {
    return tokenModel.deleteToken(refreshToken);
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
