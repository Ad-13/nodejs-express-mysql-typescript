import { TId } from './id';

export type TCar = {
  id: TId;
  make: string;
  model: string;
  year: number;
  quantity: number;
  price: number;
  images: string[];
  description?: string;
};

export type TInputCreateCar = Omit<TCar, 'id'>;

export type TInputUpdateCar = TInputCreateCar & Pick<TCar, 'id'>;

export type TOutputCar = TCar;

export type TContactMessage = {
  id: TId;
  carId: TId;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
};

export type TInputCreateContactMessage = Omit<TContactMessage, 'id' | 'createdAt'>;

export type TInputUpdateContactMessage = TInputCreateContactMessage & Pick<TContactMessage, 'id'>;

export type TOutputContactMessage = TContactMessage;
