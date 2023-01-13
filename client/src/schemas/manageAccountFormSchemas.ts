import { z } from 'zod';
import { PasswordSchema, ReTokenSchema, UsernameSchema } from './createAccount.schema';

export const changeUsernameSchema = z.object({
  newUsername: UsernameSchema,
  reToken: ReTokenSchema,
});

export const changeProfilePictureSchema = z.object({
  newProfilePicture: z.string({}).min(1, 'Modify your image'),
  reToken: ReTokenSchema,
});

export const changePasswordFormSchema = z
  .object({
    currentPassword: z.string({}).min(1, "Can't be blank"),
    newPassword: PasswordSchema,
    confirmPassword: z.string({}).min(1, "Can't be blank"),
    reToken: ReTokenSchema,
  })
  .refine((current) => current.newPassword === current.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type ChangeUsernameSchemaType = z.TypeOf<typeof changeUsernameSchema>;

export type ChangeProfilePictureSchemaType = z.TypeOf<typeof changeProfilePictureSchema>;

export type ChangePasswordSchemaType = z.TypeOf<typeof changePasswordFormSchema>;
