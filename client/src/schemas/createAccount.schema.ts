import { z } from 'zod';

export const createAccountSchema = z
  .object({
    email: z.string({}).min(1, "Can't be blank").email('Invalid email'),
    username: z
      .string({
        required_error: 'Username is required',
      })
      .min(1, "Can't be blank")
      .min(4, 'Minimum 4 characters')
      .max(14, 'Maximum 14 characters'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(1, "Can't be blank")
      .min(8, 'Minimum 8 characters'),
    confirmPassword: z
      .string({ required_error: 'Confirm password is required' })
      .min(1, "Can't be blank"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type CreateAccountSchemType = z.infer<typeof createAccountSchema>;
