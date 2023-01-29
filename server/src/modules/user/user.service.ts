import db from '../../db';
import { createRandomCode } from '../../utils/createRandomCode';
import config from 'config';
import axios from 'axios';
import crypto from 'crypto';
interface RegisterInput {
  email: string;
  username: string;
  password: string;
}

export interface IUser {
  user_id: string;
  username: string;
  email: string;
  profile_picture: string;
  password: string;
  is_verified: boolean;
  verification_code: string;
  total_subscribers: number;
  total_videos: number;
  total_views: number;
  created_at: string;
  description: string;
}

export interface IProfileInfo {
  user_id: string;
  username: string;
  profile_picture: string;
  description: string;
  total_subscribers: number;
  total_views: number;
  total_videos: number;
  created_at: string;
}

export const registerUser = async (input: RegisterInput) => {
  const randomVerificationCode = createRandomCode(6);

  const result = await db.query(
    'INSERT INTO users (email, username, password, verification_code) VALUES ($1, $2, $3, $4) RETURNING user_id, verification_code',
    [input.email, input.username, input.password, randomVerificationCode]
  );
  const data: { user_id: string; verification_code: string } = result.rows[0];
  return data;
};

export const getProfileInfo = async (username: string, currentUserId?: string) => {
  if (currentUserId === '') currentUserId = crypto.randomUUID();
  const profileInfoResult = await db.query(
    'SELECT u.user_id, u.username, u.profile_picture, u.description, u.total_subscribers, u.total_views, u.total_videos, u.created_at, CASE WHEN s.user_id = u.user_id AND s.subscriber_user_id = $2 THEN TRUE ELSE FALSE END subscribe_status FROM users as u LEFT JOIN subscribers as s ON s.user_id = u.user_id AND s.subscriber_user_id = $2 WHERE u.username = $1',
    [username, currentUserId]
  );

  const profileInfoData: IProfileInfo = profileInfoResult.rows[0];

  return profileInfoData;
};

export const changeUsername = async (username: string, userId: string) => {
  const result = await db.query(
    'UPDATE users SET username = $1 WHERE user_id = $2 RETURNING username',
    [username, userId]
  );
  const data: {
    username: string;
  } = result.rows[0];
  return data;
};

export const changeProfilePicture = async (profile_picture: string, userId: string) => {
  const result = await db.query(
    'UPDATE users SET profile_picture = $1 WHERE user_id = $2 RETURNING profile_picture',
    [profile_picture, userId]
  );
  const data: {
    profile_picture: string;
  } = result.rows[0];
  return data;
};

export const changePassword = async (hashed_password: string, userId: string) => {
  const result = await db.query(
    'UPDATE users SET password = $1 WHERE user_id = $2 RETURNING NULL',
    [hashed_password, userId]
  );
  const data: null = result.rows[0];
  return data;
};

export const getUserInfo = async (userId: string): Promise<IUser> => {
  const result = await db.query('SELECT * FROM users WHERE user_id = $1', [userId]);
  return result.rows[0];
};

export const validateHuman = async (reToken: string) => {
  const secret = config.get('google_recaptcha_secret_key') as string;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${reToken}`;
  const response = await axios.post<
    any,
    { data: { success: boolean; challenge_ts: string; hostname: string } }
  >(url);

  return response.data.success;
};

export const getTwoStepMethod = async (userId: string) => {
  const response = await db.query(
    'SELECT two_step_method FROM users WHERE user_id = $1',
    [userId]
  );
  const data: { two_step_method: 'authenticator' | null } = response.rows[0];
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
