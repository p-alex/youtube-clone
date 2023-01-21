import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import log from '../utils/logger';
import { errorResponseJson } from '../utils/responseJson';

const validateResource =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error: any) {
      log.error(error.errors);
      return errorResponseJson(res, 400, error.errors);
    }
  };

export default validateResource;
