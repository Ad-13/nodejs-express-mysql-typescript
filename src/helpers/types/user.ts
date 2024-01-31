import { ERoles } from '@enums/ERoles';

import { TId } from './id';

export type TUser = {
  id: TId;
  isActivated: boolean;
  activationLink: string;
  email: string;
  name: string;
  telephone: string;
  password: string;
  roles: ERoles[];
};

export type TInputCreateUser = Pick<
  TUser,
  'activationLink' | 'email' | 'name' | 'telephone' | 'password' | 'roles'
>;

export type TInputUpdateUser = TInputCreateUser &
  Pick<TUser, 'id' | 'isActivated' | 'activationLink'>;

export type TOutputUser = Omit<TUser, 'password' | 'telephone' | 'activationLink'>;
