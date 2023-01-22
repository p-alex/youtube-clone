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
