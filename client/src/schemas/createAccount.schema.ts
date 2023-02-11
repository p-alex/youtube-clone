import { z } from 'zod';
import { PASSWORD_RESTRICTIONS, USERNAME_RESTRICTIONS } from '../app/features/authSlice';

export const PasswordSymbolsRegex = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;

export const PasswordSchema = z
  .string({ required_error: 'Password is required' })
  .min(1, "Can't be blank")
  .regex(/[a-z]/g, 'Invalid password')
  .regex(/[A-Z]/g, 'Invalid password')
  .regex(/[0-9]/g, 'Invalid password')
  .regex(PasswordSymbolsRegex, 'Invalid password')
  .min(PASSWORD_RESTRICTIONS.minLength, 'Invalid password');

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

export const ReTokenSchema = z
  .string({ invalid_type_error: 'Please check the checkbox again' })
  .min(1, 'Please check the checkbox');

export const createAccountSchema = z
  .object({
    email: z.string({}).min(1, "Can't be blank").email('Invalid email'),
    username: UsernameSchema,
    password: PasswordSchema,
    confirmPassword: z
      .string({ required_error: 'Confirm password is required' })
      .min(1, "Can't be blank"),
    reToken: ReTokenSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type CreateAccountSchemType = z.infer<typeof createAccountSchema>;
