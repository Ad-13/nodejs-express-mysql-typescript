import jwt from 'jsonwebtoken';

import tokenModel from '@db/models/TokenModel';
import { TToken } from '@root/types';
import { TTokens } from '@app/types';
import { UserDto } from '@app/dtos/UserDto';

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

  validateAccessToken(token: string): UserDto {
    const userData = jwt.verify(token, String(process.env.JWT_ACCESS_SECRET));
    return userData as UserDto;
  }

  validateRefreshToken(token: string): UserDto {
    const userData = jwt.verify(token, String(process.env.JWT_REFRESH_SECRET));
    return userData as UserDto;
  }

  // TODO: do not forget to use Kubernetes to delete expired tokens
  async saveToken(data: Partial<TToken>): Promise<Partial<TToken>> {
    const tokenData = await tokenModel.read({ refreshToken: data.refreshToken });
    const action = tokenData ? tokenModel.update : tokenModel.create;
    return action(data);
  }

  async removeToken(refreshToken: string): Promise<string> {
    return tokenModel.deleteToken(refreshToken);
  }

  async findToken(refreshToken: string): Promise<Partial<TToken>> {
    const tokenData = await tokenModel.read({ refreshToken });
    return tokenData[0];
  }
}

export default new TokenService();
