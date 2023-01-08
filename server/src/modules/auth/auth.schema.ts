import { object, string, TypeOf } from 'zod';

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Invalid email or password'),
    password: string({
      required_error: 'Password is required',
    }).min(8, 'Invalid email or password'),
  }),
});

export const logoutUserSchema = object({
  body: object({
    userId: string({
      required_error: 'user_id is required',
    }).uuid('Invalid uuid'),
  }),
});

export const verifyEmailSchema = object({
  body: object({
    code: string({ required_error: 'Code is required' }).length(6, 'Invalid code'),
  }),
});

export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];

export type LogoutUserInput = TypeOf<typeof logoutUserSchema>['body'];

export type VerifyEmailInput = TypeOf<typeof verifyEmailSchema>['body'];
