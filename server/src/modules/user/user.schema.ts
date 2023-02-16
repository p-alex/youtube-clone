import { string, z } from 'zod';

export const DEFAULT_PROFILE_PICTURE_URL = '/images/default-profile-picture.jpg';
export const PasswordSymbolsRegex = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g;

export const MAX_PROFILE_DESCRIPTION_LENGTH = 1000;

const USERNAME_RESTRICTIONS = {
  minLength: 3,
  maxLength: 20,
};

export const PASSWORD_RESTRICTIONS = {
  minLength: 8,
};

export const PasswordSchema = z
  .string({ required_error: 'Password is required' })
  .min(
    PASSWORD_RESTRICTIONS.minLength,
    `minimum ${PASSWORD_RESTRICTIONS.minLength} characters`
  )
  .regex(/[a-z]/g, 'minimum 1 lowercase letter')
  .regex(/[A-Z]/g, 'minimum 1 uppercase letter')
  .regex(/[0-9]/g, 'minimum 1 number')
  .regex(PasswordSymbolsRegex, 'minimum 1 symbol');

export const UsernameSchema = z
  .string({ required_error: 'Username is required' })
  .min(
    USERNAME_RESTRICTIONS.minLength,
    `Minimum ${USERNAME_RESTRICTIONS.minLength} characters`
  )
  .max(
    USERNAME_RESTRICTIONS.maxLength,
    `Maximum ${USERNAME_RESTRICTIONS.maxLength} characters`
  );

export const ReTokenSchema = z.string({ required_error: 'Recaptcha token is required' });

export const registerUserSchema = z.object({
  body: z
    .object({
      email: z
        .string({
          required_error: 'Email is required to register',
        })
        .email('Email must be valid'),
      username: UsernameSchema,
      password: PasswordSchema,
      confirmPassword: z.string({
        required_error: 'Confirm password is required to register',
      }),
      reToken: ReTokenSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords must match',
      path: ['confirmPassword'],
    }),
});

export const getProfileInfoSchema = z.object({
  params: z.object({
    userId: z
      .string({ required_error: 'Please provide the user id param' })
      .uuid('User does not exist'),
  }),
});

export const changeUsernameSchema = z.object({
  body: z.object({
    newUsername: UsernameSchema,
    reToken: ReTokenSchema,
  }),
});

export const changeProfilePictureSchema = z.object({
  body: z.object({
    newProfilePicture: z.string({ required_error: 'Provide profile picture' }),
    reToken: ReTokenSchema,
  }),
});

export const changePasswordSchema = z.object({
  body: z
    .object({
      currentPassword: z.string({ required_error: 'Old password is required' }),
      newPassword: PasswordSchema,
      confirmPassword: z.string({ required_error: 'Confirm password is required' }),
      reToken: ReTokenSchema,
    })
    .refine(
      (current) => current.newPassword === current.confirmPassword,
      'Passwords must match'
    ),
});

export const changeUserDescriptionSchema = z.object({
  body: z.object({
    newDescription: z
      .string({})
      .max(
        MAX_PROFILE_DESCRIPTION_LENGTH,
        `Max ${MAX_PROFILE_DESCRIPTION_LENGTH} characters`
      ),
  }),
});

export type RegisterUserInput = z.TypeOf<typeof registerUserSchema>['body'];

export type GetProfileInfoInput = z.TypeOf<typeof getProfileInfoSchema>['params'];

export type ChangeUsernameInput = z.TypeOf<typeof changeUsernameSchema>['body'];

export type ChangeProfilePictureInput = z.TypeOf<
  typeof changeProfilePictureSchema
>['body'];

export type ChangePasswordInput = z.TypeOf<typeof changePasswordSchema>['body'];

export type ChangeUserDescriptionInput = z.TypeOf<
  typeof changeUserDescriptionSchema
>['body'];
