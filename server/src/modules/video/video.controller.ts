import { Request, Response } from 'express';
import {
  DeleteVideoInput,
  DislikeVideoInput,
  GetSuggestedVideosInput,
  GetUserVideosInput,
  GetUserVideosPrivateInput,
  GetVideoInput,
  GetVideoTagsInput,
  LikeVideoInput,
  SearchVideosInput,
  UpdateVideoInput,
  UploadVideoInput,
} from './video.schema';
import {
  deleteVideo,
  getSuggestedVideos,
  getUserVideos,
  getVideo,
  getVideos,
  getVideoTags,
  likeOrDislikeVideo,
  saveVideoToDB,
  searchVideos,
  updateVideo,
  uploadThumbnail,
  uploadVideo,
} from './video.service';
import fs from 'fs';
import util from 'util';
import { boolean } from 'zod';
import log from '../../utils/logger';
const unlinkFile = util.promisify(fs.unlink);

export const getVideosController = async (req: Request, res: Response) => {
  try {
    const videos = await getVideos();
    return res.status(200).json({ success: true, errors: [], result: { videos } });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};

export const getUserVideosPrivateController = async (
  req: Request<GetUserVideosPrivateInput>,
  res: Response
) => {
  try {
    // @ts-ignore
    const { user_id } = req.user;
    const { sortBy, page } = req.params;
    const videos = await getUserVideos(user_id, sortBy, page, true);
    return res.status(200).json({ success: true, errors: [], result: { videos } });
  } catch (error: any) {
    log.error(error.message);
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};

export const getUserVideosController = async (
  req: Request<GetUserVideosInput>,
  res: Response
) => {
  try {
    const { userId, sortBy, page } = req.params;
    const videos = await getUserVideos(userId, sortBy, page, false);
    return res.status(200).json({ success: true, errors: [], result: { videos } });
  } catch (error: any) {
    log.error(error.message);
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};

export const getVideoController = async (
  req: Request<{}, {}, GetVideoInput>,
  res: Response
) => {
  // @ts-ignore
  const { videoId, userId } = req.body;
  const isLoggedIn = userId !== '';
  try {
    const video = await getVideo(videoId, userId, isLoggedIn);
    return res.status(200).json({ success: true, errors: [], result: { video } });
  } catch (error: any) {
    log.error(error);
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};

export const getSuggestedVideosController = async (
  req: Request<{}, {}, GetSuggestedVideosInput>,
  res: Response
) => {
  try {
    const { videoId, title, description, page } = req.body;
    const videos = await getSuggestedVideos(videoId, title, description, page);
    return res
      .status(200)
      .json({ success: true, errors: [], result: { suggestedVideos: videos } });
  } catch (error: any) {
    log.error(error);
    return res.status(error?.http_code ? error.http_code : 500).json({
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
        errors: [{ message: 'There is no file' }],
        result: null,
      });

    const uploadVideoResponse = await uploadVideo({ path: video.path });

    const uploadThumbnailResponse = await uploadThumbnail(videoData.thumbnailUrl);

    videoData.videoUrl = uploadVideoResponse.secure_url;
    videoData.thumbnailUrl = uploadThumbnailResponse.secure_url;

    const video_id = await saveVideoToDB(videoData);

    await unlinkFile(video.path);

    return res.status(201).json({
      success: true,
      errors: [],
      result: { video_id },
    });
  } catch (error: any) {
    log.error(error);
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

    if (!video_id) throw new Error('Something went wrong...');

    return res.status(200).json({
      success: true,
      errors: [],
      result: [{ video_id }],
    });
  } catch (error: any) {
    log.error(error);
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
  const { videoId } = req.body;
  // @ts-ignore
  const { user_id } = req.user;
  try {
    const id = await deleteVideo(videoId, user_id);
    return res.status(200).json({ success: true, errors: [], result: { video_id: id } });
  } catch (error: any) {
    log.error(error);
    return res.status(error?.http_code ? error.http_code : 500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};

export const likeVideoController = async (
  req: Request<LikeVideoInput>,
  res: Response
) => {
  const { videoId } = req.params;
  // @ts-ignore
  const { user_id } = req.user;
  try {
    const updatedData = await likeOrDislikeVideo('like', videoId, user_id);
    return res.status(200).json({ success: true, errors: [], result: updatedData });
  } catch (error: any) {
    log.error(error);
    return res.status(error?.http_code ? error.http_code : 500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};

export const dislikeVideoController = async (
  req: Request<DislikeVideoInput>,
  res: Response
) => {
  const { videoId } = req.params;
  // @ts-ignore
  const { user_id } = req.user;
  try {
    const updatedData = await likeOrDislikeVideo('dislike', videoId, user_id);
    return res.status(200).json({ success: true, errors: [], result: updatedData });
  } catch (error: any) {
    log.error(error);
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
    const { videoId } = req.params;
    const tags = await getVideoTags(videoId);
    return res.status(200).json({ success: boolean, errors: [], result: { tags } });
  } catch (error: any) {
    log.error(error);
    return res.status(error?.http_code ? error.http_code : 500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};

export const searchVideosController = async (
  req: Request<SearchVideosInput>,
  res: Response
) => {
  const { query } = req.params;
  try {
    const searchResults = await searchVideos(query);
    res.status(200).json({ success: true, errors: [], result: { searchResults } });
  } catch (error: any) {
    log.error(error);
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};
