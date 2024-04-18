import { TId } from './id';

export type TTire = {
  id: TId;
  brand: string;
  model: string;
  size: string;
  loadIndex: number;
  speedRating: string;
  images: string[];
  quantity: number;
  price: number;
  description?: string;
};

export type TInputCreateTire = Omit<TTire, 'id'>;

export type TInputUpdateTire = TInputCreateTire & Pick<TTire, 'id'>;

export type TOutputTire = TTire;
