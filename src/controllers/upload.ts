import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/apiError";
import resSuccess from "../utils/resBase";

const postFile = (req: Request, res:Response, next: NextFunction) => {
  try {
    if(!req.file) {
      return next(new ApiError('No file selected', 400));
    }
    const file = req.file.path;
    res.status(200).json(resSuccess('Upload file successfully.', file, 200))
  } catch (err) {
    const error = err as Error
    next(new ApiError(error.message, 500))
  }
}

export default postFile