import { ERoles } from '@root/enums/ERoles';
import { TId, TUser } from '@root/types';

export class UserDto {
  id: TId;
  email: string;
  roles: ERoles[];
  isActivated: boolean;

  constructor(
    user: TUser
  ) {
    this.email = user.email
    this.id = user.id
    this.isActivated = user.isActivated
    this.roles = user.roles
  }
}
