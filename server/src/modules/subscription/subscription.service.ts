import db from '../../db';
import { IVideoSmall } from '../video/video.service';

interface SubscriptionParams {
  userId: string;
  page: number;
  limit: number;
}

interface ISubscriptionUser {
  user_id: string;
  username: string;
  profile_picture: string;
  description: string;
  total_subscribers: number;
  total_videos: number;
  subscribe_status: boolean;
}

interface ISubscriptionsMini {
  user_id: string;
  username: string;
  profile_picture: string;
}

export const getSubscriptionVideos = async ({
  userId,
  page,
  limit,
}: SubscriptionParams) => {
  const offset = page * limit;
  const response = await db.query(
    'SELECT v.video_id,v.user_id,u.username,u.profile_picture,v.thumbnail_url,v.title,v.views, v.duration, v.created_at FROM subscribers as s JOIN users as u ON u.user_id = s.user_id JOIN videos as v ON v.user_id = u.user_id WHERE s.subscriber_user_id = $1 ORDER BY v.created_at DESC  OFFSET $2 LIMIT $3',
    [userId, offset, limit]
  );
  const data: IVideoSmall[] = response.rows;
  return data;
};

export const getSubscriptionUsers = async ({
  userId,
  page,
  limit,
}: SubscriptionParams) => {
  const offset = page * limit;
  const response = await db.query(
    'SELECT u.user_id, u.username, u.profile_picture, u.description, u.total_subscribers, u.total_videos, TRUE as subscribe_status FROM subscribers AS s JOIN users AS u ON s.user_id = u.user_id WHERE s.subscriber_user_id = $1 ORDER BY s.subscribed_at DESC OFFSET $2 LIMIT $3',
    [userId, offset, limit]
  );
  const data: ISubscriptionUser[] = response.rows;
  return data;
};

export const getSubscriptionsUsersMini = async ({ userId }: { userId: string }) => {
  const response = await db.query(
    'SELECT u.user_id, u.username, u.profile_picture FROM subscribers as s JOIN users as u ON u.user_id = s.user_id WHERE subscriber_user_id = $1 ORDER BY subscribed_at DESC',
    [userId]
  );
  const data: ISubscriptionsMini[] = response.rows;
  return data;
};

export const subscribeToUser = async ({
  subscribeToUserId,
  currentUserId,
}: {
  subscribeToUserId: string;
  currentUserId: string;
}) => {
  const isCurrentUserSubscribedResponse = await db.query(
    'SELECT s.subscriber_user_id FROM subscribers AS s WHERE s.user_id = $1 AND s.subscriber_user_id = $2',
    [subscribeToUserId, currentUserId]
  );

  const isSubscribed = isCurrentUserSubscribedResponse.rows[0];

  let isSuccess: boolean;

  if (isSubscribed) {
    const response = await db.query(
      'DELETE FROM subscribers AS s WHERE s.user_id = $1 AND s.subscriber_user_id = $2  RETURNING s.subscriber_user_id',
      [subscribeToUserId, currentUserId]
    );
    isSuccess = response.rows[0].subscriber_user_id !== undefined;
    await db.query(
      'UPDATE users SET total_subscribers = users.total_subscribers - 1 WHERE user_id = $1',
      [subscribeToUserId]
    );
  } else {
    const response = await db.query(
      'INSERT INTO subscribers (user_id, subscriber_user_id) VALUES ($1, $2) RETURNING subscriber_user_id',
      [subscribeToUserId, currentUserId]
    );
    isSuccess = response.rows[0].subscriber_user_id !== undefined;
    await db.query(
      'UPDATE users SET total_subscribers = users.total_subscribers + 1 WHERE user_id = $1',
      [subscribeToUserId]
    );
  }

  return {
    success: isSuccess,
    message: `${isSubscribed ? 'Unsubscribed from' : 'Subscribed to'} user`,
  };
};

export interface Subscriber {
  user_id: string;
  subscriber_user_id: string;
  subscribed_at: string;
}

export const checkIfCurrentUserIsSubscribedToUser = async ({
  userId,
  currentUserId,
}: {
  userId: string;
  currentUserId: string;
}) => {
  const response = await db.query(
    'SELECT * FROM subscribers WHERE user_id = $1 AND subscriber_user_id = $2',
    [userId, currentUserId]
  );
  const data: Subscriber = response.rows[0];
  if (data?.user_id) {
    return true;
  } else {
    return false;
  }
};
