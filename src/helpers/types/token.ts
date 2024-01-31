import { TId } from './id';

export type TTokens = {
  accessToken: string;
  refreshToken: string;
};

export type TToken = {
  id: TId;
  userId: TId;
  refreshToken: string;
  expiresAt: Date;
};

export type TInputCreateToken = Pick<TToken, 'userId' | 'refreshToken'>;

export type TInputUpdateToken = Pick<TToken, 'id' | 'refreshToken'>;
