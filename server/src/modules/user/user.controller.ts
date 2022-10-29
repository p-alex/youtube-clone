import config from 'config';
import { Request, Response } from 'express';
import db from '../../db';
import { RegisterUserInput } from './user.scheme';
import { registerUser } from './user.service';
import argon2 from 'argon2';
import { sendEmail } from '../../../nodemailer/sendEmail';
import { verifyEmailTemplate } from '../../../nodemailer/templates';
import { signJwt } from '../../utils/jwt';

import { createRandomCode } from '../../utils/createRandomCode';

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
        result: null,
      });

    if (userWithUsername.rows[0])
      return res.status(400).json({
        success: false,
        errors: [{ message: 'A user with that username already exists' }],
        result: null,
      });

    const hashedPassword = await argon2.hash(password);

    const response = await registerUser({
      email,
      username,
      password: hashedPassword,
    });

    if (!response.verification_code) throw new Error();

    await sendEmail(verifyEmailTemplate(response.verification_code));

    return res.status(201).json({
      success: true,
      errors: [],
      result: null,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};
