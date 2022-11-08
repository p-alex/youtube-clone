import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

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
      console.error(error.errors);
      return res.status(400).json({ errors: error.errors });
    }
  };

export default validateResource;
