import { NextFunction, Request, Response } from 'express';

export const parseVideoData = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.duration = parseFloat(req.body.duration);
    req.body.tag_list = JSON.parse(req.body.tag_list);
    next();
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, errors: [{ message: error.message }], result: null });
  }
};
