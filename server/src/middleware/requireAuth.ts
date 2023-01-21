import { NextFunction, Request, Response } from 'express';
import { verifyJwt } from '../utils/jwt';
import { errorResponseJson } from '../utils/responseJson';

export interface CustomRequest extends Request {
  user?: {
    user_id: string;
    email: string;
    username: string;
    profile_picture: string;
  };
}

export const requireAuth = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) return errorResponseJson(res, 400, 'No authorization header');
  const accessToken = authorizationHeader.split(' ')[1];
  if (!accessToken) return errorResponseJson(res, 400, 'No authorization header');
  const decoded = verifyJwt<{
    user_id: string;
    email: string;
    username: string;
    profile_picture: string;
  }>(accessToken, 'access_token_secret');
  if (!decoded) return errorResponseJson(res, 403, 'Invalid token');
  req.user = decoded;
  return next();
};
