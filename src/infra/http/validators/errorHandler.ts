import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../../../structure/apiResponse';

export const errorHandler = () => {
  return (error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(error);
    }

    if (error instanceof ApiResponse) {
      return res.status(error.statusCode).json(error);
    }

    return res.status(500).json({
      message: 'Internal server error.'
    });
  };
};
