import { signJwt } from '../../utils/jwt';
import config from 'config';
import axios from 'axios';
import qs from 'querystring';
import log from '../../utils/logger';

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

interface GoogleTokensResult {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  id_token: string;
}

export const getGoogleOAuthTokens = async ({
  code,
}: {
  code: string;
}): Promise<GoogleTokensResult> => {
  const url = 'https://oauth2.googleapis.com/token';
  const values = {
    code,
    client_id: config.get('google_client_id') as string,
    client_secret: config.get('google_client_secret') as string,
    redirect_uri: config.get('google_oauth_redirect_url') as string,
    grant_type: 'authorization_code',
  };

  try {
    const res = await axios.post<GoogleTokensResult>(url, qs.stringify(values), {
      headers: {
        Content_Type: 'application/x-www-form-urlencoded',
      },
    });
    return res.data;
  } catch (error: any) {
    log.error(error, 'Failed to fetch Google OAuth Tokens');
    throw new Error(error.message);
  }
};

interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export const getGoogleUser = async ({
  id_token,
  access_token,
}: {
  id_token: string;
  access_token: string;
}): Promise<GoogleUserResult> => {
  try {
    const res = await axios.get<GoogleUserResult>(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );
    return res.data;
  } catch (error: any) {
    log.error(error, 'Error fetching Google user');
    throw new Error(error.message);
  }
};
