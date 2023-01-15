import { NextFunction, Request, Response } from 'express';
import log from '../utils/logger';
import { errorResponseJson } from '../utils/responseJson';

export const parseVideoData = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.duration = parseFloat(req.body.duration);
    req.body.tagList = JSON.parse(req.body.tagList);
    req.body.sizeInMb = parseFloat(req.body.sizeInMb);
    next();
  } catch (error: any) {
    log.error(error);
    return errorResponseJson(res, 500, error.message);
  }
};
