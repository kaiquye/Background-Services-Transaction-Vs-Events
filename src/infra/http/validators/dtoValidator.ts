import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'yup';
import { ApiResponse } from '../../../structure/apiResponse';

export function DtoValidator<DtoType extends ObjectSchema<unknown>>(dto: DtoType) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
      throw ApiResponse.UNPROCESSABLE_ENTITY('Invalid request');
    }
    try {
      await dto.validate(req.body);
      return next();
    } catch (error) {
      console.log('validatior error', error);
      throw ApiResponse.UNPROCESSABLE_ENTITY('Invalid request');
    }
  };
}
