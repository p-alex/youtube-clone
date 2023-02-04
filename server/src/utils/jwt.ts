import jwt from 'jsonwebtoken';
import config from 'config';
import log from './logger';

type Secrets =
  | 'access_token_secret'
  | 'refresh_token_secret'
  | 'verify_email_token_secret';

export function signJwt(
  object: Object,
  secretName: Secrets,
  options?: jwt.SignOptions | undefined
) {
  const secret = config.get<string>(secretName);
  return jwt.sign(object, secret, {
    ...(options && options),
    algorithm: config.get('jwt_sign_algorithm'),
  });
}

export function verifyJwt<T>(token: string, secretName: Secrets): T | null {
  try {
    const secret = config.get<string>(secretName);
    const decoded = jwt.verify(token, secret) as T;
    return decoded;
  } catch (error) {
    log.error(error);
    return null;
  }
}
