import db from '../../db';
import { createRandomCode } from '../../utils/createRandomCode';
import config from 'config';
import axios from 'axios';

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

export const registerUser = async (input: RegisterInput) => {
  const randomVerificationCode = createRandomCode(6);

  const result = await db.query(
    'INSERT INTO users (email, username, password, verification_code) VALUES ($1, $2, $3, $4) RETURNING user_id, verification_code',
    [input.email, input.username, input.password, randomVerificationCode]
  );
  const data: { user_id: string; verification_code: string } = result.rows[0];
  return data;
};

export const getProfileBasicInfo = async (username: string) => {
  const result = await db.query(
    'SELECT user_id, username, profile_picture, total_subscribers, description FROM users WHERE username = $1',
    [username]
  );
  const data: {
    user_id: string;
    username: string;
    profile_picture: string;
    total_subscribers: number;
  } = result.rows[0];
  return data;
};

export const getProfileStats = async (username: string) => {
  const result = await db.query(
    'SELECT total_videos, total_views, created_at FROM users WHERE username = $1',
    [username]
  );
  const data: {
    description: string;
    total_videos: number;
    total_views: number;
    created_at: string;
  } = result.rows[0];
  return data;
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

export const changeEmail = async (email: string, userId: string) => {
  const result = await db.query(
    'UPDATE users SET email = $1 WHERE user_id = $2 RETURNING email',
    [email, userId]
  );
  const data: {
    email: string;
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
