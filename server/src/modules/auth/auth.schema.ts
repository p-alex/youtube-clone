import { object, string, TypeOf } from 'zod';

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Invalid email or password'),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Invalid email or password'),
  }),
});

export const logoutUserSchema = object({
  body: object({
    user_id: string({
      required_error: 'user_id is required',
    }),
  }),
});

export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];

export type LogoutUserInput = TypeOf<typeof logoutUserSchema>['body'];
