import db from '../../db';

interface RegisterInput {
  email: string;
  username: string;
  password: string;
}

export const registerUser = async (input: RegisterInput) => {
  const result = await db.query(
    'INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING user_id',
    [input.email, input.username, input.password]
  );
  const user: { user_id: string } = result.rows[0];
  return user;
};

export const getUsers = async () => {
  const result = await db.query('SELECT * FROM users', []);
  const users = result.rows;
  return users;
};
