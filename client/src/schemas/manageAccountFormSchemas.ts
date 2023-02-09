import { z } from 'zod';
import { PasswordSchema, ReTokenSchema, UsernameSchema } from './createAccount.schema';

export const MAX_PROFILE_DESCRIPTION_LENGTH = 1000;

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

export const changeDescriptionFormSchema = z.object({
  newDescription: z
    .string({})
    .max(
      MAX_PROFILE_DESCRIPTION_LENGTH,
      `Max ${MAX_PROFILE_DESCRIPTION_LENGTH} characters`
    ),
});

export type ChangeUsernameSchemaType = z.TypeOf<typeof changeUsernameSchema>;

export type ChangeProfilePictureSchemaType = z.TypeOf<typeof changeProfilePictureSchema>;

export type ChangePasswordSchemaType = z.TypeOf<typeof changePasswordFormSchema>;

export type ChangeDescriptionSchemaType = z.TypeOf<typeof changeDescriptionFormSchema>;
