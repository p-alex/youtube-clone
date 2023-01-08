import { z } from 'zod';

export const loginUserSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email or password'),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(8, 'Invalid email or password'),
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
  }),
});

export type LoginUserInput = z.TypeOf<typeof loginUserSchema>['body'];

export type LogoutUserInput = z.TypeOf<typeof logoutUserSchema>['body'];

export type VerifyEmailInput = z.TypeOf<typeof verifyEmailSchema>['body'];
