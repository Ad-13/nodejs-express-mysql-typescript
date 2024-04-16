import { check } from 'express-validator';
import { v4 } from 'uuid';
import path from 'path';
import fs from 'fs';

import CarService from '@services/CarService';

import * as Errors from '@errors/index';

import { TCar, TInputCreateCar, TInputUpdateCar, TOutputCar } from '@helpersTypes/car';
import { TRequest, TRequestWithParams, TResponse } from '@helpersTypes/expressTypes';
import { validateExpressData } from '@utils/validateExpressData';
import { TId, TIdParams } from '@helpersTypes/id';

import AbstractCrudController from './AbstractCrudController';

class CarController extends AbstractCrudController<
  TCar,
  TInputCreateCar,
  TInputUpdateCar,
  TOutputCar
> {
  protected service = CarService;

  protected validateCreateData = async (req: TRequest<TInputCreateCar>): Promise<void> => {
    const rules = [
      check('make', 'Make is required').notEmpty(),
      check('model', 'Model is required').notEmpty(),
      check('year', 'year is required').notEmpty(),
      check('price', 'price is required').notEmpty(),
    ];

    return validateExpressData(rules, req);
  };

  public create = async (
    req: TRequest<TInputCreateCar>,
    res: TResponse<TOutputCar>,
  ): Promise<void> => {
    await this.validateCreateData?.(req);

    const data = req.body;
    const newImages: string[] = [];
    const images = !req.files
      ? []
      : Array.isArray(req.files.images)
      ? req.files.images
      : [req.files.images];

    images.forEach(image => {
      if (!image) return;
      const fileName = v4() + '.jpg';
      newImages.push(fileName);
      image.mv(path.resolve(__dirname, '..', 'static', fileName));
    });

    const result = await this.service.create({ ...data, images: newImages });

    res.status(201).json(result);
  };

  public update = async (
    req: TRequest<TInputUpdateCar, TIdParams>,
    res: TResponse<TOutputCar>,
  ): Promise<void> => {
    await this.validateUpdateData?.(req);

    const id = req.params.id;
    const data = req.body;
    const existingCar = await this.service.getById(id);

    if (!existingCar) {
      throw new Errors.NotFoundError({ message: `Car with id ${id} not found` });
    }

    const existingImages: string[] = [...existingCar.images];
    const updatedImages: string[] = [];
    const newImages = !req.files
      ? []
      : Array.isArray(req.files.images)
      ? req.files.images
      : [req.files.images];

    existingCar.images.forEach(async image => {
      const newImages = Array.isArray(data.images) ? data.images : [data.images];
      const hasImage = newImages.some(x => x === image);
      if (!hasImage) {
        const index = existingImages.findIndex(x => x === image);
        existingImages.splice(index, 1);
        await this.removeImage(image);
      }
    });

    newImages.forEach(uploadedImage => {
      if (!uploadedImage || existingCar.images.includes(uploadedImage.name)) return;

      const fileName = v4() + '.jpg'; // TODO: solve issue with names (decide which to use)
      updatedImages.push(fileName);
      uploadedImage.mv(path.resolve(__dirname, '..', 'static', fileName));
    });

    const result = await this.service.update({
      ...data,
      id,
      images: [...existingImages, ...updatedImages],
    });

    res.status(200).json(result);
  };

  public deleteById = async (
    req: TRequestWithParams<TIdParams>,
    res: TResponse<TId>,
  ): Promise<void> => {
    const { id } = req.params;
    const existingCar = await this.service.getById(id);

    if (!existingCar) {
      throw new Errors.NotFoundError({ message: `Car with id ${id} not found` });
    }

    existingCar.images.forEach(async image => {
      await this.removeImage(image);
    });

    super.deleteById(req, res);
  };

  private removeImage = async (imageName: string): Promise<void> => {
    const imagePath = path.resolve(__dirname, '..', 'static', imageName);

    try {
      await fs.promises.unlink(imagePath);
    } catch (error) {
      console.error(`Error deleting image ${imageName}:`, error);
    }
  };
}

export default CarController;
