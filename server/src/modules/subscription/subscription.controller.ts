import { Request, Response } from 'express';
import { errorResponseJson, successResponseJson } from '../../utils/responseJson';
import { GetSubscriptionVideosInput } from './subscription.schema';
import { getSubscriptionVideos } from './subscription.service';
import log from '../../utils/logger';

export const getSubscriptionVideosController = async (
  req: Request<GetSubscriptionVideosInput>,
  res: Response
) => {
  try {
    //@ts-ignore
    const { user_id } = req.user;
    const { page } = req.params;
    const videos = await getSubscriptionVideos({
      userId: user_id,
      page: parseInt(page),
      limit: 20,
    });
    return successResponseJson(res, 200, { videos });
  } catch (error: any) {
    log.error(error);
    return errorResponseJson(res, 500, 'Something went wrong...');
  }
};
