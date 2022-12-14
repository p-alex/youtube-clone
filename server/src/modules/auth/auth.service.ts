import db from '../../db';
import { signJwt } from '../../utils/jwt';
import config from 'config';
import axios from 'axios';
import qs from 'qs';
import log from '../../utils/logger';
import { securePasswordGenerator } from '../../utils/securePasswordGenerator';
import argon2 from 'argon2';
import { QueryResult } from 'pg';

interface User {
  user_id: string;
  email: string;
  username: string;
}

export const createSession = async (user_id: string) => {
  try {
    const session: QueryResult<{ session_id: string; user_id: string }> = await db.query(
      'INSERT INTO sessions (user_id) VALUES ($1) RETURNING session_id, user_id',
      [user_id]
    );
    return session.rows[0];
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const signRefreshToken = async (session: {
  session_id: string;
  user_id: string;
}) => {
  const refreshToken = signJwt(session, 'refresh_token_secret', {
    expiresIn: config.get('refresh_token_expire'),
  });

  return refreshToken;
};

export const signAccessToken = (user: User) => {
  const accessToken = signJwt(user, 'access_token_secret', {
    expiresIn: config.get('access_token_expire'),
  });

  return accessToken;
};
