import db from '../../db';
import { createRandomCode } from '../../utils/createRandomCode';

interface RegisterInput {
  email: string;
  username: string;
  password: string;
}

export const registerUser = async (input: RegisterInput) => {
  const randomVerificationCode = createRandomCode(6);

  const result = await db.query(
    'INSERT INTO users (email, username, password, verification_code) VALUES ($1, $2, $3, $4) RETURNING user_id, verification_code',
    [input.email, input.username, input.password, randomVerificationCode]
  );
  const data: { user_id: string; verification_code: string } = result.rows[0];
  return data;
};

export const getProfileInfo = async (username: string) => {
  const result = await db.query(
    'SELECT user_id, username, profile_picture, total_subscribers, created_at FROM users WHERE username = $1',
    [username]
  );
  const data: {
    user_id: string;
    username: string;
    profile_picture: string;
    total_subscribers: number;
    created_at: string;
  } = result.rows[0];
  return data;
};
