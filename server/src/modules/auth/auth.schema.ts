import { z } from 'zod';
import { PasswordSchema, ReTokenSchema } from '../user/user.schema';

export const loginUserSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email or password'),
    password: PasswordSchema,
    reToken: ReTokenSchema,
  }),
});

export const logoutUserSchema = z.object({
  body: z.object({
    userId: z
      .string({
        required_error: 'user_id is required',
      })
      .uuid('Invalid uuid'),
  }),
});

export const verifyEmailSchema = z.object({
  body: z.object({
    code: z.string({ required_error: 'Code is required' }).length(6, 'Invalid code'),
    reToken: ReTokenSchema,
  }),
});

export type LoginUserInput = z.TypeOf<typeof loginUserSchema>['body'];

export type LogoutUserInput = z.TypeOf<typeof logoutUserSchema>['body'];

export type VerifyEmailInput = z.TypeOf<typeof verifyEmailSchema>['body'];
