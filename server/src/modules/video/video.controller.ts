import { Request, Response } from 'express';
import { AddNewVideoInput } from './video.schema';
import { addVideo, uploadThumbnail, uploadVideo } from './video.service';
import fs from 'fs';
import util from 'util';
const unlinkFile = util.promisify(fs.unlink);

export const uploadVideoController = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file)
      return res
        .status(400)
        .json({ success: false, errors: [{ message: 'There is no file' }] });

    const response = await uploadVideo({ path: file.path });

    await unlinkFile(file.path);

    return res
      .status(201)
      .json({ success: true, errors: [], videoUrl: response.secure_url });
  } catch (error: any) {
    console.log(error);
    return res
      .status(error?.http_code ? error.http_code : 500)
      .json({ success: false, errors: [{ message: error.message }], videoUrl: null });
  }
};

export const addNewVideoController = async (
  req: Request<{}, {}, AddNewVideoInput>,
  res: Response
) => {
  const details = req.body;

  try {
    const uploadThumbnailResponse = await uploadThumbnail(details.thumbnail);

    details.thumbnail = uploadThumbnailResponse.secure_url;

    const addVideoToDatabase = await addVideo(details);

    return res
      .status(201)
      .json({ success: true, errors: [], video_id: addVideoToDatabase.video_url });
  } catch (error: any) {
    console.log(error);
    return res
      .status(error?.http_code ? error.http_code : 500)
      .json({ success: false, errors: [{ message: error.message }], video_id: null });
  }
};
