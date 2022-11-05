import { Request, Response } from 'express';
import db from '../../db';
import { LoginUserInput, LogoutUserInput, VerifyEmailInput } from './auth.schema';
import { signAccessToken, signRefreshToken } from './auth.service';
import argon2 from 'argon2';
import { QueryResult } from 'pg';
import { verifyJwt } from '../../utils/jwt';
import config from 'config';

export const loginUserController = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response
) => {
  const { email, password } = req.body;

  try {
    const response = (await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ])) as QueryResult<{
      user_id: string;
      email: string;
      username: string;
      password: string;
      profile_picture: string;
      is_verified: boolean;
    }>;

    const user = response.rows[0];

    // Check if email already exists
    if (!user)
      return res.status(400).json({
        success: false,
        errors: [{ message: 'Invalid email or password' }],
        result: null,
      });

    // Check if user is verified
    if (!user.is_verified) {
      return res.status(400).json({
        success: false,
        errors: [{ message: 'Please verify your email' }],
        result: null,
      });
    }

    // Check if password is correct
    const isValidPassword = await argon2.verify(user.password, password);

    if (!isValidPassword)
      return res.status(400).json({
        success: false,
        errors: [{ message: 'Invalid email or password' }],
        result: null,
      });

    // Sign access token
    const accessToken = signAccessToken({
      user_id: user.user_id,
      email: user.email,
      username: user.username,
    });
    // Sign refresh token
    const refreshToken = await signRefreshToken(user.user_id);
    // Send tokens

    if (!refreshToken) throw new Error('Something went wrong...');

    res.cookie('rtoken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 604800000,
    });

    return res.status(200).json({
      success: true,
      errors: [],
      result: {
        user: {
          user_id: user.user_id,
          email: user.email,
          username: user.username,
          profile_picture: user.profile_picture,
        },
        accessToken,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      results: 0,
      errors: [{ message: 'Something went wrong...' }],
      result: null,
    });
  }
};

export const refreshTokenController = async (req: Request, res: Response) => {
  const token = req.cookies.rtoken;

  if (!token)
    return res.status(403).json({
      success: false,
      errors: [{ message: 'There is no rtoken cookie' }],
      result: null,
    });

  try {
    const decoded = verifyJwt<{ session_id: string; user_id: string }>(
      token,
      'refresh_token_secret'
    );

    if (!decoded)
      return res.status(403).json({
        success: false,
        errors: [{ message: 'Invalid token' }],
        result: null,
      });

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

    if (!currentSession)
      return res.status(403).json({
        success: false,
        errors: [{ message: 'There is no session' }],
        result: null,
      });

    const newRefreshToken = await signRefreshToken(
      currentSession.user_id,
      currentSession.session_id
    );

    if (!newRefreshToken) throw new Error('Something went wrong...');

    res.cookie('rtoken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 604800000,
    });

    const newAccessToken = await signAccessToken({
      user_id: currentSession.user_id,
      username: currentSession.username,
      email: currentSession.email,
    });

    return res.status(200).json({
      success: true,
      errors: [],
      result: {
        user: {
          user_id: currentSession.user_id,
          email: currentSession.email,
          username: currentSession.username,
          profile_picture: currentSession.profile_picture,
        },
        accessToken: newAccessToken,
      },
    });
  } catch (error: any) {
    console.log(error);
    res.cookie('rtoken', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 0,
    });
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
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

    return res.status(200).json({
      success: true,
      errors: [],
      result: null,
    });
  }

  try {
    const decoded = verifyJwt<{ session_id: string; user_id: string }>(
      token,
      'refresh_token_secret'
    );

    if (!decoded)
      return res
        .status(403)
        .json({ success: false, errors: [{ message: 'Invalid token' }], result: null });

    await db.query('DELETE FROM sessions WHERE session_id = $1 AND user_id = $2', [
      decoded.session_id,
      decoded.user_id,
    ]);

    res.cookie('rtoken', '', {
      httpOnly: true,
      secure: true,
      maxAge: 0,
    });

    return res.status(200).json({
      success: true,
      errors: [],
      result: null,
    });
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, errors: [{ message: error.message }], result: null });
  }
};

export const verifyEmailController = async (
  req: Request<{}, {}, VerifyEmailInput>,
  res: Response
) => {
  const response: QueryResult<{ verification_code: string }> = await db.query(
    'SELECT verification_code FROM users WHERE verification_code = $1',
    [req.body.code]
  );

  if (!response.rows[0])
    return res
      .status(400)
      .json({ success: false, errors: [{ message: 'Invalid code' }], result: null });

  const code = response.rows[0].verification_code;

  const isCodeValid = response.rows[0].verification_code === code;

  if (!isCodeValid)
    return res
      .status(400)
      .json({ success: false, errors: [{ message: 'Invalid code' }], result: null });

  await db.query(
    'UPDATE users SET is_verified = true, verification_code = null WHERE verification_code = $1',
    [code]
  );

  return res.status(200).json({ success: true, errors: [], result: null });
};
