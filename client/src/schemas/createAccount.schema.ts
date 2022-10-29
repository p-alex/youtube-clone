import { z } from 'zod';

export const createAccountSchema = z
  .object({
    email: z.string({}).email(),
    username: z
      .string({
        required_error: 'Username is required',
      })
      .min(4, 'Username must contain at least 4 character(s)')
      .max(14, 'Username must contain at most 14 character(s)'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password must contain at least 8 character(s)'),
    confirmPassword: z
      .string({ required_error: 'Confirm password is required' })
      .min(6, 'Confirm password must contain at least 8 character(s)'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type CreateAccountSchemType = z.infer<typeof createAccountSchema>;
