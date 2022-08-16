import jwt from 'jsonwebtoken';
import config from 'config';

export function signJwt(
  object: Object,
  secretName: 'access_token_secret' | 'refresh_token_secret',
  options?: jwt.SignOptions | undefined
) {
  const secret = config.get<string>(secretName);
  return jwt.sign(object, secret, {
    ...(options && options),
    algorithm: 'HS256',
  });
}

export function verifyJwt<T>(
  token: string,
  secretName: 'access_token_secret' | 'refresh_token_secret'
): T | null {
  try {
    const secret = config.get<string>(secretName);
    const decoded = jwt.verify(token, secret) as T;
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
}
