export type TId = number | string;

export type TModel<T> = {
  create(data: Partial<T>): Promise<Partial<T>>
  readById(id: TId): Promise<Partial<T>>
  read(conditions: Partial<T>): Promise<Partial<T>[]>
  update(data: Partial<T>): Promise<Partial<T>>
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
