import { NextFunction, Request, Response } from 'express';
import { verifyJwt } from '../utils/jwt';

export interface CustomRequest extends Request {
  user?: {
    user_id: string;
    email: string;
    username: string;
    profile_picture: string;
  };
}

export const getUserFormAccessToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) return next();
  const accessToken = authorizationHeader.split(' ')[1];
  const decoded = verifyJwt<{
    user_id: string;
    email: string;
    username: string;
    profile_picture: string;
  }>(accessToken, 'access_token_secret');
  if (!decoded)
    return res
      .status(403)
      .json({ success: false, errors: [{ message: 'Invalid token' }] });
  req.user = decoded;
  return next();
};
