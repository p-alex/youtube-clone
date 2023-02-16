import { Request, Response } from 'express';
import { errorResponseJson, successResponseJson } from '../../utils/responseJson';
import {
  CheckIfCurrentUserIsSubscribedToUserInput,
  GetSubscriptionVideosInput,
  SubscribeToUserInput,
} from './subscription.schema';
import {
  checkIfCurrentUserIsSubscribedToUser,
  getSubscriptionsUsersMini,
  getSubscriptionUsers,
  getSubscriptionVideos,
  subscribeToUser,
} from './subscription.service';
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

export const getSubscriptionUsersController = async (
  req: Request<GetSubscriptionVideosInput>,
  res: Response
) => {
  try {
    //@ts-ignore
    const { user_id } = req.user;
    const { page } = req.params;
    const users = await getSubscriptionUsers({
      userId: user_id,
      page: parseInt(page),
      limit: 20,
    });
    return successResponseJson(res, 200, { users });
  } catch (error: any) {
    log.error(error);
    return errorResponseJson(res, 500, 'Something went wrong...');
  }
};

export const getSubscriptionsUsersMiniController = async (
  req: Request,
  res: Response
) => {
  try {
    //@ts-ignore
    const { user_id: userId } = req.user as string;
    const subscriptionsMini = await getSubscriptionsUsersMini({ userId });
    return successResponseJson(res, 200, { subscriptionsMini });
  } catch (error: any) {
    log.error(error);
    return errorResponseJson(res, 500, error.message);
  }
};

export const subscribeToUserController = async (
  req: Request<{}, {}, SubscribeToUserInput>,
  res: Response
) => {
  try {
    //@ts-ignore
    const { user_id: currentUserId } = req.user as string;
    const { subscribeToUserId } = req.body;
    const { success, message } = await subscribeToUser({
      subscribeToUserId,
      currentUserId,
    });
    if (!success) return errorResponseJson(res, 500, 'Something went wrong...');
    return successResponseJson(res, 200, { success, message });
  } catch (error: any) {
    log.error(error);
    return errorResponseJson(res, 500, error.message);
  }
};

export const checkIfCurrentUserIsSubscribedToUserController = async (
  req: Request<CheckIfCurrentUserIsSubscribedToUserInput>,
  res: Response
) => {
  try {
    const { userId } = req.params;
    //@ts-ignore
    const { user_id: currentUserId } = req.user as string;
    const isSubscribed = await checkIfCurrentUserIsSubscribedToUser({
      currentUserId,
      userId,
    });
    return successResponseJson(res, 200, { isSubscribed });
  } catch (error: any) {
    log.error(error);
    return errorResponseJson(res, 500, error.message);
  }
};
