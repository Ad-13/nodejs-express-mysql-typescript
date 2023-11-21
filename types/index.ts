export type TId = number | string;

export type TCrudModel<T> = {
  create(data: Partial<T>): Promise<T>
  readById(id: TId): Promise<T>
  read(conditions: Partial<T>): Promise<T[]>
  update(data: Partial<T>): Promise<T>
  delete(id: TId): Promise<TId>
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
