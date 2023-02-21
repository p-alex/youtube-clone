import { Request, Response } from 'express';
import db from '../../db';
import { LoginUserInput, LogoutUserInput, VerifyEmailInput } from './auth.schema';
import { signAccessToken, signRefreshToken } from './auth.service';
import argon2 from 'argon2';
import { QueryResult } from 'pg';
import { verifyJwt } from '../../utils/jwt';
import { IUser, validateHuman } from '../user/user.service';
import {
  errorResponseJson,
  NOT_HUMAN_ERROR_MESSAGE,
  successResponseJson,
} from '../../utils/responseJson';
import log from '../../utils/logger';
import { createSession } from '../session/session.service';

export const loginUserController = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response
) => {
  try {
    const { email, password, reToken } = req.body;

    const isHuman = await validateHuman(reToken);

    if (!isHuman) return errorResponseJson(res, 400, NOT_HUMAN_ERROR_MESSAGE);

    const response = (await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ])) as QueryResult<IUser>;

    const user = response.rows[0];

    // Check if email already exists
    if (!user) return errorResponseJson(res, 400, 'Invalid email or password');

    // Check if user is verified
    if (!user.is_verified) return errorResponseJson(res, 400, 'Please verify your email');

    // Check if password is correct
    const isValidPassword = await argon2.verify(user.password, password);

    if (!isValidPassword) return errorResponseJson(res, 400, 'Invalid email or password');

    const session = await createSession(user.user_id);

    // Sign access token
    const accessToken = signAccessToken({
      user_id: user.user_id,
      email: user.email,
      username: user.username,
    });
    // Sign refresh token
    const refreshToken = await signRefreshToken(session);
    // Send tokens

    if (!refreshToken) throw new Error('Something went wrong...');

    res.cookie('rtoken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      path: '/',
      maxAge: 604800000,
    });
    return successResponseJson(res, 200, {
      user: {
        user_id: user.user_id,
        email: user.email,
        username: user.username,
        profile_picture: user.profile_picture,
      },
      accessToken,
    });
  } catch (error: any) {
    log.error(error);
    return errorResponseJson(res, 500, 'Something went wrong...');
  }
};

export const refreshTokenController = async (req: Request, res: Response) => {
  const token = req.cookies.rtoken;

  if (!token) return errorResponseJson(res, 400, 'There is no rtoken cookie');

  try {
    const decoded = verifyJwt<{ session_id: string; user_id: string }>(
      token,
      'refresh_token_secret'
    );

    if (!decoded) return errorResponseJson(res, 403, 'Invalid token');

    const session = (await db.query(
      'SELECT s.user_id, u.username, u.email, u.profile_picture, s.session_id FROM sessions as s JOIN users as u ON s.user_id = u.user_id WHERE S.session_id = $1 AND S.user_id = $2',
      [decoded.session_id, decoded.user_id]
    )) as QueryResult<{
      user_id: string;
      username: string;
      email: string;
      profile_picture: string;
      session_id: string;
    }>;

    const currentSession = session.rows[0];

    if (!currentSession) return errorResponseJson(res, 403, 'There is no session');

    const newRefreshToken = await signRefreshToken(currentSession);

    if (!newRefreshToken) throw new Error('Something went wrong...');

    res.cookie('rtoken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 604800000,
    });

    const newAccessToken = await signAccessToken({
      user_id: currentSession.user_id,
      username: currentSession.username,
      email: currentSession.email,
    });

    return successResponseJson(res, 200, {
      user: {
        user_id: currentSession.user_id,
        email: currentSession.email,
        username: currentSession.username,
        profile_picture: currentSession.profile_picture,
      },
      accessToken: newAccessToken,
    });
  } catch (error: any) {
    log.error(error);
    res.cookie('rtoken', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 0,
    });
    return errorResponseJson(res, 500, error.message);
  }
};

export const logoutUserController = async (
  req: Request<{}, {}, LogoutUserInput>,
  res: Response
) => {
  const token = req.cookies.rtoken;
  const { userId } = req.body;

  if (!token) {
    await db.query('DELETE FROM sessions WHERE user_id = $1', [userId]);

    res.cookie('rtoken', '', {
      httpOnly: true,
      secure: true,
      maxAge: 0,
    });

    return successResponseJson(res, 200, null);
  }

  try {
    const decoded = verifyJwt<{ session_id: string; user_id: string }>(
      token,
      'refresh_token_secret'
    );

    if (!decoded) return errorResponseJson(res, 403, 'Invalid token');

    await db.query('DELETE FROM sessions WHERE session_id = $1 AND user_id = $2', [
      decoded.session_id,
      decoded.user_id,
    ]);

    res.cookie('rtoken', '', {
      httpOnly: true,
      secure: true,
      maxAge: 0,
    });
    return successResponseJson(res, 200, null);
  } catch (error: any) {
    log.error(error);
    return errorResponseJson(res, 500, error.message);
  }
};

export const verifyEmailController = async (
  req: Request<{}, {}, VerifyEmailInput>,
  res: Response
) => {
  const { code, reToken } = req.body;

  const isHuman = await validateHuman(reToken);

  if (!isHuman) return errorResponseJson(res, 400, NOT_HUMAN_ERROR_MESSAGE);

  const response: QueryResult<{ verification_code: string }> = await db.query(
    'SELECT verification_code FROM users WHERE verification_code = $1',
    [code]
  );

  if (!response.rows[0]) return errorResponseJson(res, 400, 'Incorrect code');

  const verificationCode = response.rows[0].verification_code;

  const isCodeValid = verificationCode === code;

  if (!isCodeValid) return errorResponseJson(res, 400, 'Invalid code');

  await db.query(
    'UPDATE users SET is_verified = true, verification_code = null WHERE verification_code = $1',
    [code]
  );

  return successResponseJson(res, 200, null);
};
