import { TId } from './id';

export type TCar = {
  id: TId;
  make: string;
  model: string;
  year: number;
};

export type TInputCreateCar = Pick<TCar, 'make' | 'model' | 'year'>;

export type TInputUpdateCar = TInputCreateCar & Pick<TCar, 'id'>;

export type TOutputCar = TCar;
