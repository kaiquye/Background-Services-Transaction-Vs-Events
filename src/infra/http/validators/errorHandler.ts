import 'reflect-metadata';
import { ApiResponse } from '../../../structure/apiResponse';

export const errorHandler = (error, req, res, next) => {
  console.log('ERROR: ', error);
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof ApiResponse) {
    return res.status(error.statusCode).json(error);
  }

  console.error(error.message);
  console.error(error);
  return res.status(500).json({
    message: 'Internal server error.'
  });
};

// esta dando erro com o padrao register
export const errorHandlerAdapter = (callback) => {
  return async (req, res, next) => {
    try {
      return await callback(req, res);
    } catch (error) {
      return next(error);
    }
  };
};
