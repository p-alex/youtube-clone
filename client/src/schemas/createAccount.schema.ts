import { z } from 'zod';
import { PASSWORD_RESTRICTIONS, USERNAME_RESTRICTIONS } from '../app/features/authSlice';

export const PasswordSchema = z
  .string({ required_error: 'Password is required' })
  .min(1, "Can't be blank")
  .min(
    PASSWORD_RESTRICTIONS.minLength,
    `Minimum ${PASSWORD_RESTRICTIONS.minLength} characters`
  )
  .max(
    PASSWORD_RESTRICTIONS.maxLength,
    `Maximum ${PASSWORD_RESTRICTIONS.maxLength} characters`
  );

export const UsernameSchema = z
  .string({})
  .min(1, "Can't be blank")
  .min(
    USERNAME_RESTRICTIONS.minLength,
    `Minimum ${USERNAME_RESTRICTIONS.minLength} characters`
  )
  .max(
    USERNAME_RESTRICTIONS.maxLength,
    `Maximum ${USERNAME_RESTRICTIONS.maxLength} characters`
  );

export const createAccountSchema = z
  .object({
    email: z.string({}).min(1, "Can't be blank").email('Invalid email'),
    username: UsernameSchema,
    password: PasswordSchema,
    confirmPassword: z
      .string({ required_error: 'Confirm password is required' })
      .min(1, "Can't be blank"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type CreateAccountSchemType = z.infer<typeof createAccountSchema>;
