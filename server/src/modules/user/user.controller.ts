import { Request, Response } from 'express';
import db from '../../db';
import { RegisterUserInput } from './user.scheme';
import { getUsers, registerUser } from './user.service';
import argon2 from 'argon2';

export const registerUserController = async (
  req: Request<{}, {}, RegisterUserInput>,
  res: Response
) => {
  const { email, username, password } = req.body;

  try {
    const userWithEmail = await db.query('SELECT email FROM users WHERE email = $1', [
      email,
    ]);

    const userWithUsername = await db.query(
      'SELECT username FROM users WHERE username = $1',
      [username]
    );

    if (userWithEmail.rows[0])
      return res.status(400).json({
        success: false,
        errors: [{ message: 'A user with that email already exists' }],
      });

    if (userWithUsername.rows[0])
      return res.status(400).json({
        success: false,
        errors: [{ message: 'A user with that username already exists' }],
      });

    const hashedPassword = await argon2.hash(password);

    const user = await registerUser({ email, username, password: hashedPassword });

    if (!user) throw new Error();

    return res.status(201).json({
      success: true,
      errors: [],
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
    });
  }
};

export const getUserController = async (req: Request, res: Response) => {
  const users = await getUsers();
  return res.status(200).json(users);
};
