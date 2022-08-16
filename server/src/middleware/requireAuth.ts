import { NextFunction, Request, Response } from 'express';
import { verifyJwt } from '../utils/jwt';

interface CustomRequest extends Request {
  user?: {
    user_id: string;
    email: string;
    username: string;
    profile_picture: string;
  };
}

export const requireAuth = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader)
    return res
      .status(400)
      .json({ success: false, errors: [{ message: 'No authorization header' }] });
  const accessToken = authorizationHeader.split(' ')[1];
  if (!accessToken)
    return res
      .status(400)
      .json({ success: false, errors: [{ message: 'No authorization header' }] });
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
