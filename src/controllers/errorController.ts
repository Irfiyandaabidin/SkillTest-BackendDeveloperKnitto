import { NextFunction, Request, Response } from "express";

interface IError {
  statusCode: number,
  status: string,
  message: string;
}

// 09. Error handling
export default (err: IError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';
  err.message = err.message;

  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message
  })
}