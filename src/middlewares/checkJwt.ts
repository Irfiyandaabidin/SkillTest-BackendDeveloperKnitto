import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/apiError";

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// 02. Middleware untuk check token JWT
export = (req:Request, res:Response, next: NextFunction) => {
  const bearerToken = req.headers.authorization;
  if(!bearerToken) {
    return next(new ApiError('You dont have token JWT', 401));
  }
  try {
    const token = bearerToken.split('Bearer ')[1];
    const payload = jwt.verify(token, JWT_SECRET || 'SECRET');
    next()
  } catch (err) {
    return next(new ApiError('Authorization denied!', 401));
  }
}