import { TId } from './id';

export type TRole = {
  id: TId;
  value: string;
  description: string;
};

export type TInputCreateRole = Pick<TRole, 'description' | 'value'>;

export type TInputUpdateRole = TInputCreateRole & Pick<TRole, 'id'>;

export type TUserRole = {
  id: TId;
  userId: TId;
  roleValue: TId;
};

export type TInputCreateUserRole = Pick<TUserRole, 'userId' | 'roleValue'>;

export type TInputUpdateUserRole = TInputCreateUserRole & Pick<TUserRole, 'id'>;

export type TInputDeleteUserRole = TInputUpdateUserRole;
