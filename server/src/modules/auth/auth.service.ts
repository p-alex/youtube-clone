import db from '../../db';
import { signJwt } from '../../utils/jwt';
import config from 'config';

interface User {
  user_id: string;
  email: string;
  username: string;
}

export const createSession = async (user_id: string, session_id?: string) => {
  try {
    if (session_id) {
      await db.query('DELETE FROM sessions WHERE session_id = $1', [session_id]);
    }
    const session = await db.query(
      'INSERT INTO sessions (user_id) VALUES ($1) RETURNING session_id, user_id',
      [user_id]
    );
    return session.rows[0] as { session_id: string; user_id: string } | null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const signRefreshToken = async (user_id: string, session_id?: string) => {
  const session = await createSession(user_id, session_id);

  if (!session) return null;

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
