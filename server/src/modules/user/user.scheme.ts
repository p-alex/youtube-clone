import { object, string, TypeOf } from 'zod';

export const registerUserSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required to register',
    }).email('Email must be valid'),
    username: string({
      required_error: 'Username is required to register',
    })
      .min(4, 'Username must contain at least 6 character(s)')
      .max(15, 'Username must contain max 15 character(s)'),
    password: string({
      required_error: 'Password is required to register',
    }).min(6, 'Password must contain at least 6 character(s)'),
    confirmPassword: string({
      required_error: 'Confirm password is required to register',
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  }),
});

export type RegisterUserInput = TypeOf<typeof registerUserSchema>['body'];
