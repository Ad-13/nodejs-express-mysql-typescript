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
