import { Request, Response } from 'express';
import db from '../../db';
import {
  ChangePasswordInput,
  ChangeProfilePictureInput,
  ChangeUsernameInput,
  DEFAULT_PROFILE_PICTURE_URL,
  GetProfileInfoInput,
  RegisterUserInput,
} from './user.schema';
import {
  getProfileStats,
  getProfileBasicInfo,
  registerUser,
  changeUsername,
  changeProfilePicture,
  changePassword,
  getUserInfo,
  validateHuman,
} from './user.service';
import argon2 from 'argon2';
import { sendEmail } from '../../nodemailer/sendEmail';
import { verifyEmailTemplate } from '../../nodemailer/templates';
import log from '../../utils/logger';
import { cloudinary } from '../../cloudinary';
import { extractCloudinaryPublicId } from '../../utils/extractCloudinaryPublicId';

export const registerUserController = async (
  req: Request<{}, {}, RegisterUserInput>,
  res: Response
) => {
  const { email, username, password, reToken } = req.body;

  try {
    const isHuman = await validateHuman(reToken);

    if (!isHuman)
      return res.status(400).json({
        success: false,
        errors: [{ message: 'Something very suspicious is going on...' }],
        result: null,
      });

    const userWithEmail = await db.query('SELECT email FROM users WHERE email = $1', [
      email,
    ]);

    if (userWithEmail.rows[0])
      return res.status(400).json({
        success: false,
        errors: [{ message: 'A user with that email already exists' }],
        result: null,
      });

    const userWithUsername = await db.query(
      'SELECT username FROM users WHERE username = $1',
      [username]
    );

    if (userWithUsername.rows[0])
      return res.status(400).json({
        success: false,
        errors: [{ message: 'A user with that username already exists' }],
        result: null,
      });

    const hashedPassword = await argon2.hash(password);

    const response = await registerUser({
      email,
      username,
      password: hashedPassword,
    });

    if (!response.verification_code) throw new Error();

    await sendEmail(verifyEmailTemplate(response.verification_code));

    return res.status(201).json({
      success: true,
      errors: [],
      result: null,
    });
  } catch (error: any) {
    log.error(error);
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};

export const getProfileInfoController = async (
  req: Request<GetProfileInfoInput>,
  res: Response
) => {
  try {
    const { username } = req.params;
    const profileInfo = await getProfileBasicInfo(username);
    if (!profileInfo?.user_id)
      return res.status(404).json({ success: false, errors: [], result: null });
    return res.status(200).json({
      success: true,
      errors: [],
      result: { profileInfo },
    });
  } catch (error: any) {
    log.error(error);
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};

export const getProfileStatsController = async (
  req: Request<GetProfileInfoInput>,
  res: Response
) => {
  try {
    const { username } = req.params;
    const profileAbout = await getProfileStats(username);
    return res.status(200).json({
      success: true,
      errors: [],
      result: { profileAbout },
    });
  } catch (error: any) {
    log.error(error);
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
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
    if (!isHuman)
      return res.status(400).json({
        success: false,
        errors: [{ message: 'Something very suspicious is going on...' }],
        result: null,
      });

    const isTaken = await db.query('SELECT username FROM users WHERE username = $1', [
      newUsername,
    ]);

    if (isTaken.rows[0]?.username)
      return res.status(401).json({
        success: false,
        errors: [{ message: 'A user with that username already exists' }],
        result: null,
      });

    const response = await changeUsername(newUsername, user_id);

    return res
      .status(200)
      .json({ success: true, errors: [], result: { username: response.username } });
  } catch (error: any) {
    log.error(error);
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
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

    if (!isHuman)
      return res.status(400).json({
        success: false,
        errors: [{ message: 'Something very suspicious is going on...' }],
        result: null,
      });

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
      return res.status(200).json({
        success: true,
        errors: [],
        result: { profile_picture: saveProfilePictureToDb.profile_picture },
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

    return res.status(200).json({
      success: true,
      errors: [],
      result: { profile_picture: saveProfilePictureToDb.profile_picture },
    });
  } catch (error: any) {
    log.error(error);
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
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

    if (!isHuman)
      return res.status(400).json({
        success: false,
        errors: [{ message: 'Something very suspicious is going on...' }],
        result: null,
      });

    const userInfo = await getUserInfo(user_id);

    const isValid = await argon2.verify(userInfo.password, currentPassword);

    if (!isValid)
      return res.status(401).json({
        success: false,
        errors: [{ message: 'Wrong current password' }],
        result: null,
      });

    const newHashedPassword = await argon2.hash(newPassword);

    await changePassword(newHashedPassword, user_id);

    return res.status(200).json({
      success: true,
      errors: [],
      result: null,
    });
  } catch (error: any) {
    log.error(error);
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};
