import TireModel from '@db/mysql/models/TireModel';

import { TTire, TInputCreateTire, TInputUpdateTire, TOutputTire } from '@helpersTypes/tire';

import AbstractCrudService from './AbstractCrudService';

class TireService extends AbstractCrudService<
  TTire,
  TInputCreateTire,
  TInputUpdateTire,
  TOutputTire
> {
  protected model = TireModel;
  protected selectColumns: (keyof TTire)[] = [
    'id',
    'images',
    'brand',
    'description',
    'loadIndex',
    'model',
    'price',
    'size',
    'speedRating',
    'quantity',
  ];
}

export default new TireService();
