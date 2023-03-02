import db from '../../db';
import { createRandomCode } from '../../utils/createRandomCode';
import config from 'config';
import axios from 'axios';
import log from '../../utils/logger';
import { sendEmail } from '../../nodemailer/sendEmail';
import {
  forgetPasswordVerificationCodeTemplate,
  verifyEmailTemplate,
} from '../../nodemailer/templates';
interface RegisterInput {
  email: string;
  username: string;
  password: string;
  profile_picture?: string;
  oauthProvider?: 'google';
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
  oauth_provider: string;
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
  try {
    const verificationCode =
      input.oauthProvider === undefined ? createRandomCode(6) : null;

    const is_verified = input.oauthProvider === undefined ? false : true;

    if (!input.oauthProvider && verificationCode) {
      const response = await sendEmail(
        verifyEmailTemplate({
          to: input.email,
          username: input.username,
          verificationCode,
        })
      );
      if (!response.success)
        throw new Error('Failed to send verification email. Try again later...');
    }

    const profile_picture = input.profile_picture
      ? input.profile_picture
      : '/images/default-profile-picture.jpg';

    const result = await db.query(
      'INSERT INTO users (email, username, password, profile_picture, verification_code, is_verified, oauth_provider) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING user_id, verification_code',
      [
        input.email,
        input.username,
        input.password,
        profile_picture,
        verificationCode,
        is_verified,
        input.oauthProvider,
      ]
    );
    const data: { user_id: string; verification_code: string } = result.rows[0];
    return { success: true, message: 'Success', data };
  } catch (error: any) {
    log.error(error.message);
    return { success: false, message: error.message, data: null };
  }
};

export const getProfileInfo = async (userId: string, currentUserId?: string) => {
  const profileInfoResult = await db.query(
    'SELECT u.user_id, u.username, u.profile_picture, u.description, u.total_subscribers, u.total_views, u.total_videos, u.created_at FROM users as u LEFT JOIN subscribers as s ON s.user_id = u.user_id WHERE u.user_id = $1',
    [userId]
  );

  const profileInfoData: IProfileInfo = profileInfoResult.rows[0];

  return profileInfoData;
};

interface IChannel {
  user_id: string;
  username: string;
  profile_picture: string;
  description: string;
  total_videos: number;
  total_subscribers: number;
}

export const searchChannels = async ({
  query,
  page,
}: {
  query: string;
  page: string;
}) => {
  const limit = 15;
  const offset = parseInt(page) * limit;
  const result = await db.query(
    'SELECT user_id, username, profile_picture, description, total_videos, total_subscribers FROM users WHERE username LIKE $1 ORDER BY total_subscribers DESC OFFSET $2 LIMIT $3',
    [`%${query}%`, offset, limit]
  );
  const data = result.rows as IChannel[];
  return { users: data, nextPage: data.length ? parseInt(page) + 1 : undefined };
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

export const getUserInfo = async (userId: string, email?: string): Promise<IUser> => {
  const query = email
    ? 'SELECT * FROM users WHERE email = $1'
    : 'SELECT * FROM users WHERE user_id = $1';
  const result = await db.query(query, [email ? email : userId]);
  return result.rows[0] as IUser;
};

export const changeUserDescription = async ({
  newDescription,
  userId,
}: {
  newDescription: string;
  userId: string;
}) => {
  const response = await db.query(
    'UPDATE users SET description = $1 WHERE user_id = $2 RETURNING description',
    [newDescription, userId]
  );
  const data: { description: string } = response.rows[0];
  return data;
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

export const forgetPasswordSendCode = async (
  email: string
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const code = createRandomCode(6);
    await sendEmail(forgetPasswordVerificationCodeTemplate(email, code));
    return { success: true, message: 'Success' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
