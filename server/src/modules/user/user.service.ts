import db from '../../db';
import { createRandomCode } from '../../utils/createRandomCode';

interface RegisterInput {
  email: string;
  username: string;
  password: string;
}

export const registerUser = async (input: RegisterInput) => {
  const randomVerificationCode = createRandomCode(8);
  const result = await db.query(
    'INSERT INTO users (email, username, password, verification_code) VALUES ($1, $2, $3, $4) RETURNING user_id, verification_code',
    [input.email, input.username, input.password, randomVerificationCode]
  );
  const data: { user_id: string; verification_code: string } = result.rows[0];
  return data;
};

export const getUsers = async () => {
  const result = await db.query('SELECT * FROM users', []);
  const users = result.rows;
  return users;
};
