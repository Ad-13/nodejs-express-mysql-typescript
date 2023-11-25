import { ERoles } from '@root/enums/ERoles';

export type TId = number | string;

export type TCrudModel<T> = {
  create(data: Partial<T>): Promise<T>
  readById(id: TId): Promise<T>
  read(conditions: Partial<T>): Promise<T[]>
  update(data: Partial<T>): Promise<T>
  delete(id: Partial<T>): Promise<void>
  deleteById(id: TId): Promise<TId>
}

export type TCar = {
  id: TId
  make: string
  model: string
  year: number
}

export type TCarPart = {
  id: TId
  car_id: TId
  name: string
  price: number
}

export type TUser = {
  id: TId
  name: string
  email: string
  password: string
  isActivated: boolean
  activationLink: string
  roles: ERoles[]
}

export type TSeller = {
  id: TId
  name: string
  email: string
  password: string
}

export type TClient = {
  id: TId
  name: string
  email: string
  password: string
}

export type TToken = {
  id: TId
  userId: TId
  refreshToken: string
  expiresAt: Date
}

export type TRole = {
  id: TId
  value: string
  description: string
}

export type TUserRole = {
  id: TId
  userId: TId
  roleId: TId
}
