import { string, z } from 'zod';

export const DEFAULT_PROFILE_PICTURE_URL = '/images/default-profile-picture.jpg';

const USERNAME_RESTRICTIONS = {
  minLength: 4,
  maxLength: 15,
};

export const PASSWORD_RESTRICTIONS = {
  minLength: 8,
  maxLength: 30,
};

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
    username: z.string({ required_error: 'Please provide the username param' }),
  }),
  body: z.object({
    currentUserId: z.string({}).optional(),
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

export const subscribeToUserSchema = z.object({
  body: z.object({
    subscribeToUserId: string({ required_error: 'User id is required' }).uuid(
      'User id must be a uuid'
    ),
  }),
});

export type RegisterUserInput = z.TypeOf<typeof registerUserSchema>['body'];

export type GetProfileInfoInput = z.TypeOf<typeof getProfileInfoSchema>;

export type ChangeUsernameInput = z.TypeOf<typeof changeUsernameSchema>['body'];

export type ChangeProfilePictureInput = z.TypeOf<
  typeof changeProfilePictureSchema
>['body'];

export type ChangePasswordInput = z.TypeOf<typeof changePasswordSchema>['body'];

export type SubscribeToUserInput = z.TypeOf<typeof subscribeToUserSchema>['body'];
