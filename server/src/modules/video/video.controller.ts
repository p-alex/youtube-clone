import { Request, Response } from "express";
import {
  DeleteVideoInput,
  GetVideoTagsInput,
  LikeOrDislikeVideoInput,
  UpdateVideoInput,
  UploadVideoInput,
} from "./video.schema";
import {
  deleteVideo,
  getUserVideos,
  getVideo,
  getVideoLikeStatus,
  getVideos,
  getVideoTags,
  likeOrDislikeVideo,
  saveVideoToDB,
  updateVideo,
  uploadThumbnail,
  uploadVideo,
} from "./video.service";
import fs from "fs";
import util from "util";
import { boolean } from "zod";
const unlinkFile = util.promisify(fs.unlink);

export const getVideosController = async (req: Request, res: Response) => {
  try {
    const videos = await getVideos();
    return res
      .status(200)
      .json({ success: true, errors: [], result: { videos } });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};

export const getUserVideosController = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const { user_id } = req.user;
    const videos = await getUserVideos(user_id);
    return res
      .status(200)
      .json({ success: true, errors: [], result: { videos } });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};

export const getVideoController = async (req: Request, res: Response) => {
  const { video_id } = req.params;
  // @ts-ignore
  const { user_id } = req.user;
  try {
    const videoData = await getVideo(video_id, user_id);
    return res
      .status(200)
      .json({ success: true, errors: [], result: { video: videoData } });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};

export const uploadVideoController = async (
  req: Request<{}, {}, UploadVideoInput>,
  res: Response
) => {
  try {
    const video = req.file;

    const videoData = req.body;

    if (!video?.mimetype)
      return res.status(400).json({
        success: false,
        errors: [{ message: "There is no file" }],
        result: null,
      });

    // Upload video to cloudinary
    const uploadVideoResponse = await uploadVideo({ path: video.path });

    // Upload thumbnail to cloudinary
    const uploadThumbnailResponse = await uploadThumbnail(
      videoData.thumbnail_url
    );

    // // Save secure urls in videoData
    videoData.video_url = uploadVideoResponse.secure_url;
    videoData.thumbnail_url = uploadThumbnailResponse.secure_url;

    // // Save video to database
    const video_id = await saveVideoToDB(videoData);

    // Delete uploaded video from local files
    await unlinkFile(video.path);

    return res.status(201).json({
      success: true,
      errors: [],
      result: { video_id },
    });
  } catch (error: any) {
    console.log(error);
    return res.status(error?.http_code ? error.http_code : 500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};

export const updateVideoController = async (
  req: Request<{}, {}, UpdateVideoInput>,
  res: Response
) => {
  const videoData = req.body;
  // @ts-ignore
  const { user_id } = req.user;
  try {
    const video_id = await updateVideo(videoData, user_id);

    if (!video_id) throw new Error("Something went wrong...");

    return res.status(200).json({
      success: true,
      errors: [],
      result: [{ video_id }],
    });
  } catch (error: any) {
    console.log(error);
    return res.status(error?.http_code ? error.http_code : 500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};

export const deleteVideoController = async (
  req: Request<{}, {}, DeleteVideoInput>,
  res: Response
) => {
  const { video_id } = req.body;
  // @ts-ignore
  const { user_id } = req.user;
  try {
    const id = await deleteVideo(video_id, user_id);
    return res
      .status(200)
      .json({ success: true, errors: [], result: { video_id: id } });
  } catch (error: any) {
    console.log(error);
    return res.status(error?.http_code ? error.http_code : 500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};

export const likeOrDislikeVideoController = async (
  req: Request<{}, {}, LikeOrDislikeVideoInput>,
  res: Response
) => {
  const { action_type, video_id } = req.body;
  // @ts-ignore
  const { user_id } = req.user;
  try {
    await likeOrDislikeVideo(action_type, video_id, user_id);
    return res.status(200).json({ success: true, errors: [], result: null });
  } catch (error: any) {
    console.log(error);
    return res.status(error?.http_code ? error.http_code : 500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};

export const getVideoTagsController = async (
  req: Request<GetVideoTagsInput>,
  res: Response
) => {
  try {
    const { video_id } = req.params;
    const tags = await getVideoTags(video_id);
    return res
      .status(200)
      .json({ success: boolean, errors: [], result: { tags } });
  } catch (error: any) {
    console.log(error);
    return res.status(error?.http_code ? error.http_code : 500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};
