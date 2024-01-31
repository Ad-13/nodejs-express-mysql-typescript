import { TId } from './id';

export type TCarPart = {
  id: TId;
  name: string;
  price: number;
};

export type TInputCreateCarPart = Pick<TCarPart, 'name' | 'price'>;

export type TInputUpdateCarPart = TInputCreateCarPart & Pick<TCarPart, 'id'>;
