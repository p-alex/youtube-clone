import { object, string, TypeOf, z } from 'zod';

export const DEFAULT_PROFILE_PICTURE_URL = '/images/default-profile-picture.jpg';

const USERNAME_RESTRICTIONS = {
  minLength: 4,
  maxLength: 15,
};

export const PASSWORD_RESTRICTIONS = {
  minLength: 8,
  maxLength: 30,
};

export const registerUserSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required to register',
    }).email('Email must be valid'),
    username: string({
      required_error: 'Username is required to register',
    })
      .min(
        USERNAME_RESTRICTIONS.minLength,
        `Username must contain at least ${USERNAME_RESTRICTIONS.minLength} character(s)`
      )
      .max(
        USERNAME_RESTRICTIONS.maxLength,
        `Username must contain max ${USERNAME_RESTRICTIONS.maxLength} character(s)`
      ),
    password: string({
      required_error: 'Password is required to register',
    })
      .min(
        PASSWORD_RESTRICTIONS.minLength,
        `Password must contain at least ${PASSWORD_RESTRICTIONS.minLength} character(s)`
      )
      .max(
        PASSWORD_RESTRICTIONS.maxLength,
        `Password must contain at most ${PASSWORD_RESTRICTIONS.maxLength} character(s)`
      ),
    confirmPassword: string({
      required_error: 'Confirm password is required to register',
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  }),
});

export const getProfileInfoSchema = object({
  params: object({
    username: string({ required_error: 'Please provide the username param' }),
  }),
});

export const changeUsernameSchema = object({
  body: object({
    newUsername: string({
      required_error: 'Username is required',
    })
      .min(
        USERNAME_RESTRICTIONS.minLength,
        `Username must contain at least ${USERNAME_RESTRICTIONS.minLength} character(s)`
      )
      .max(
        USERNAME_RESTRICTIONS.maxLength,
        `Username must contain max ${USERNAME_RESTRICTIONS.maxLength} character(s)`
      ),
    reToken: string({ required_error: 'Recaptcha token is required' }),
  }),
});

export const changeProfilePictureSchema = object({
  body: object({
    newProfilePicture: z.string({ required_error: 'Provide profile picture' }),
    reToken: string({ required_error: 'Recaptcha token is required' }),
  }),
});

export const changePasswordSchema = object({
  body: object({
    currentPassword: string({ required_error: 'Old password is required' }),
    newPassword: string({
      required_error: 'Password is required',
    })
      .min(
        PASSWORD_RESTRICTIONS.minLength,
        `Password must contain at least ${PASSWORD_RESTRICTIONS.minLength} character(s)`
      )
      .max(
        PASSWORD_RESTRICTIONS.maxLength,
        `Password must contain at most ${PASSWORD_RESTRICTIONS.maxLength} character(s)`
      ),
    confirmPassword: string({ required_error: 'Confirm password is required' }),
    reToken: string({ required_error: 'ReCaptcha token is required' }),
  }).refine(
    (current) => current.newPassword === current.confirmPassword,
    'Passwords must match'
  ),
});

export type RegisterUserInput = TypeOf<typeof registerUserSchema>['body'];

export type GetProfileInfoInput = TypeOf<typeof getProfileInfoSchema>['params'];

export type ChangeUsernameInput = TypeOf<typeof changeUsernameSchema>['body'];

export type ChangeProfilePictureInput = TypeOf<typeof changeProfilePictureSchema>['body'];

export type ChangePasswordInput = TypeOf<typeof changePasswordSchema>['body'];
