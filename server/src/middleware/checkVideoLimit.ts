import { NextFunction, Request, Response } from 'express';
import config from 'config';
import log from '../utils/logger';
import { errorResponseJson } from '../utils/responseJson';
import { getUserInfo } from '../modules/user/user.service';

const MAX_VIDEOS_PER_USER =
  process.env.NODE_ENV === 'production'
    ? parseInt(config.get<string>('max_videos_per_user'))
    : 99999;

export const checkVideoLimit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //@ts-ignore
    const { user_id } = req.user;
    const userData = await getUserInfo(user_id);
    if (userData.total_videos >= MAX_VIDEOS_PER_USER)
      return errorResponseJson(
        res,
        401,
        `Max ${MAX_VIDEOS_PER_USER} videos limit reached.`
      );
    next();
  } catch (error: any) {
    log.error(error);
    return errorResponseJson(res, 500, error.message);
  }
};
