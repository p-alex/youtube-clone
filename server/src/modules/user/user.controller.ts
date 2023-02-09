import { Request, Response } from 'express';
import db from '../../db';
import {
  ChangePasswordInput,
  ChangeProfilePictureInput,
  ChangeUserDescriptionInput,
  ChangeUsernameInput,
  CheckIfCurrentUserIsSubscribedToUserInput,
  DEFAULT_PROFILE_PICTURE_URL,
  GetProfileInfoInput,
  RegisterUserInput,
  SubscribeToUserInput,
} from './user.schema';
import {
  registerUser,
  changeUsername,
  changeProfilePicture,
  changePassword,
  getUserInfo,
  validateHuman,
  subscribeToUser,
  getProfileInfo,
  checkIfCurrentUserIsSubscribedToUser,
  changeUserDescription,
} from './user.service';
import argon2 from 'argon2';
import { sendEmail } from '../../nodemailer/sendEmail';
import { verifyEmailTemplate } from '../../nodemailer/templates';
import log from '../../utils/logger';
import { cloudinary } from '../../cloudinary';
import { extractCloudinaryPublicId } from '../../utils/extractCloudinaryPublicId';
import {
  errorResponseJson,
  NOT_HUMAN_ERROR_MESSAGE,
  successResponseJson,
} from '../../utils/responseJson';

export const registerUserController = async (
  req: Request<{}, {}, RegisterUserInput>,
  res: Response
) => {
  const { email, username, password, reToken } = req.body;

  try {
    const isHuman = await validateHuman(reToken);

    if (!isHuman) return errorResponseJson(res, 400, NOT_HUMAN_ERROR_MESSAGE);

    const userWithEmail = await db.query('SELECT email FROM users WHERE email = $1', [
      email,
    ]);

    if (userWithEmail.rows[0])
      return errorResponseJson(res, 400, 'A user with that email already exists');

    const userWithUsername = await db.query(
      'SELECT username FROM users WHERE username = $1',
      [username]
    );

    if (userWithUsername.rows[0])
      return errorResponseJson(res, 400, 'A user with that username already exists');

    const hashedPassword = await argon2.hash(password);

    const response = await registerUser({
      email,
      username,
      password: hashedPassword,
    });

    if (!response.verification_code) throw new Error();

    await sendEmail(verifyEmailTemplate(response.verification_code));

    return successResponseJson(res, 201, null);
  } catch (error: any) {
    log.error(error);
    return errorResponseJson(res, 500, error.message);
  }
};

export const getProfileInfoController = async (
  req: Request<GetProfileInfoInput['params'], {}, GetProfileInfoInput['body']>,
  res: Response
) => {
  try {
    const { username } = req.params;
    const { currentUserId } = req.body;

    const profileInfo = await getProfileInfo(username, currentUserId);

    if (!profileInfo?.user_id)
      return errorResponseJson(res, 404, 'This profile does not exist');

    return successResponseJson(res, 200, { profileInfo });
  } catch (error: any) {
    log.error(error);
    return errorResponseJson(res, 500, error.message);
  }
};

export const changeUsernameController = async (
  req: Request<{}, {}, ChangeUsernameInput>,
  res: Response
) => {
  //@ts-ignore
  const { user_id } = req.user;
  const { newUsername, reToken } = req.body;
  try {
    const isHuman = await validateHuman(reToken);

    if (!isHuman) return errorResponseJson(res, 400, NOT_HUMAN_ERROR_MESSAGE);

    const isTaken = await db.query('SELECT username FROM users WHERE username = $1', [
      newUsername,
    ]);

    if (isTaken.rows[0]?.username)
      return errorResponseJson(res, 401, 'A user with that username already exists');

    const response = await changeUsername(newUsername, user_id);

    return successResponseJson(res, 200, { username: response.username });
  } catch (error: any) {
    log.error(error);
    return errorResponseJson(res, 500, error.message);
  }
};

export const changeProfilePictureController = async (
  req: Request<{}, {}, ChangeProfilePictureInput>,
  res: Response
) => {
  try {
    //@ts-ignore
    const { user_id } = req.user;
    const { newProfilePicture, reToken } = req.body;

    const isHuman = validateHuman(reToken);

    if (!isHuman) return errorResponseJson(res, 400, NOT_HUMAN_ERROR_MESSAGE);

    const userInfo = await getUserInfo(user_id);

    if (newProfilePicture === DEFAULT_PROFILE_PICTURE_URL) {
      const saveProfilePictureToDb = await changeProfilePicture(
        newProfilePicture,
        user_id
      );
      await cloudinary.uploader.destroy(
        extractCloudinaryPublicId(userInfo.profile_picture),
        { resource_type: 'image' }
      );
      return successResponseJson(res, 200, {
        profile_picture: saveProfilePictureToDb.profile_picture,
      });
    }

    const { secure_url } = await cloudinary.uploader.upload(
      newProfilePicture.toString(),
      {
        resource_type: 'image',
        upload_preset: 'youtube-clone-profile-pictures',
        transformation: { width: 360, height: 360, gravity: 'center', crop: 'crop' },
      }
    );

    if (userInfo.profile_picture !== DEFAULT_PROFILE_PICTURE_URL && secure_url) {
      await cloudinary.api.delete_resources([
        extractCloudinaryPublicId(userInfo.profile_picture),
      ]);
    }

    const saveProfilePictureToDb = await changeProfilePicture(secure_url, user_id);

    return successResponseJson(res, 200, {
      profile_picture: saveProfilePictureToDb.profile_picture,
    });
  } catch (error: any) {
    log.error(error);
    return errorResponseJson(res, 500, error.message);
  }
};

export const changePasswordController = async (
  req: Request<{}, {}, ChangePasswordInput>,
  res: Response
) => {
  try {
    //@ts-ignore
    const { user_id } = req.user;
    const { currentPassword, newPassword, reToken } = req.body;

    const isHuman = validateHuman(reToken);

    if (!isHuman) return errorResponseJson(res, 400, NOT_HUMAN_ERROR_MESSAGE);

    const userInfo = await getUserInfo(user_id);

    const isValid = await argon2.verify(userInfo.password, currentPassword);

    if (!isValid) return errorResponseJson(res, 401, 'Wrong current password');

    const newHashedPassword = await argon2.hash(newPassword);

    await changePassword(newHashedPassword, user_id);

    return successResponseJson(res, 200, null);
  } catch (error: any) {
    log.error(error);
    return errorResponseJson(res, 500, error.message);
  }
};

export const changeUserDescriptionController = async (
  req: Request<{}, {}, ChangeUserDescriptionInput>,
  res: Response
) => {
  try {
    //@ts-ignore
    const { user_id: userId } = req.user;
    const { newDescription } = req.body;
    const response = await changeUserDescription({ newDescription, userId });
    return successResponseJson(res, 200, { newDescription: response.description });
  } catch (error: any) {
    log.error(error);
    return errorResponseJson(res, 500, error.message);
  }
};

export const subscribeToUserController = async (
  req: Request<{}, {}, SubscribeToUserInput>,
  res: Response
) => {
  try {
    //@ts-ignore
    const { user_id: currentUserId } = req.user as string;
    const { subscribeToUserId } = req.body;
    const { success, message } = await subscribeToUser({
      subscribeToUserId,
      currentUserId,
    });
    if (!success) return errorResponseJson(res, 500, 'Something went wrong...');
    return successResponseJson(res, 200, { success, message });
  } catch (error: any) {
    log.error(error);
    return errorResponseJson(res, 500, error.message);
  }
};

export const checkIfCurrentUserIsSubscribedToUserController = async (
  req: Request<CheckIfCurrentUserIsSubscribedToUserInput>,
  res: Response
) => {
  try {
    const { userId } = req.params;
    //@ts-ignore
    const { user_id: currentUserId } = req.user as string;
    const isSubscribed = await checkIfCurrentUserIsSubscribedToUser({
      currentUserId,
      userId,
    });
    return successResponseJson(res, 200, { isSubscribed });
  } catch (error: any) {
    log.error(error);
    return errorResponseJson(res, 500, error.message);
  }
};
