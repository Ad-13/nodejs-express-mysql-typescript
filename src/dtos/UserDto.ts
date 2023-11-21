import { TId, TUser } from "@root/types";

export class UserDto {
  email: string;
  id: TId;
  isActivated: boolean;

  constructor(
    user: TUser
  ) {
    this.email = user.email
    this.id = user.id
    this.isActivated = user.isActivated
  }
}
