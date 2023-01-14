import { Response } from 'express';

export const successResponseJson = <ResultData>(
  res: Response,
  code: number,
  result: ResultData
) => {
  return res.status(code).json({ success: true, errors: [], result });
};

export const NOT_HUMAN_ERROR_MESSAGE = 'Something very suspicious is going on...';

export const errorResponseJson = (res: Response, code: number, message: string) => {
  return res.status(code).json({ success: false, errors: [{ message }], result: null });
};
