import { Request, Response } from 'express';
import log from '../../utils/logger';
import {
  getGoogleOAuthTokens,
  getGoogleUser,
  getUserInfo,
  registerUser,
} from '../user/user.service';
import config from 'config';
import { securePasswordGenerator } from '../../utils/securePasswordGenerator';
import { signRefreshToken } from '../auth/auth.service';
import argon2 from 'argon2';
import { createSession } from './session.service';

export const googleOAuthController = async (req: Request, res: Response) => {
  // get the code from the qs
  const code = req.query.code as string;
  // get the id and access token with the code
  try {
    const { id_token, access_token } = await getGoogleOAuthTokens({ code });
    // get user with tokens
    // const googleUser = jwt.decode(id_token);
    const googleUser = await getGoogleUser({ id_token, access_token });
    // upsert the user
    const user = await getUserInfo('', googleUser.email);

    if (user?.user_id && user?.oauth_provider !== 'google')
      throw new Error('A user with that email already exists');

    //Upsert user if user does not exist
    let newUserId: string = '';
    if (!user) {
      const password = securePasswordGenerator();
      const hashedPassword = await argon2.hash(password);
      const registerUserResponse = await registerUser({
        email: googleUser.email,
        username: googleUser.name,
        profile_picture: googleUser.picture,
        password: hashedPassword,
        oauthProvider: 'google',
      });
      if (!registerUserResponse.data) throw new Error(registerUserResponse.message);
      newUserId = registerUserResponse.data.user_id;
    }

    // create a session
    const session = await createSession(newUserId ? newUserId : user.user_id);
    // create refresh tokens
    const refreshToken = signRefreshToken(session);
    // set cookies
    res.cookie('rtoken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 604800000,
    });
    // redirect back to client
    res.redirect(config.get('client_side_base_url'));
  } catch (error: any) {
    log.error(error, 'Failed to authorize Google user');
    return res.redirect(
      `${config.get('client_side_base_url')}/signin?error=${error.message}`
    );
  }
};
