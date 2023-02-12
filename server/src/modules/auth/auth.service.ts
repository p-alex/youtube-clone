import { signJwt } from '../../utils/jwt';
import config from 'config';

interface User {
  user_id: string;
  email: string;
  username: string;
}

export const signRefreshToken = (session: { session_id: string; user_id: string }) => {
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
