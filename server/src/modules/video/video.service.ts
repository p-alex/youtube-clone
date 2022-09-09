import { QueryResult } from 'pg';
import { cloudinary } from '../../cloudinary';
import db from '../../db';
import { getImagePublicId, getVideoPublicId } from '../../utils/getPublicId';
import { UploadVideoInput } from './video.schema';

export interface IVideo {
  video_id: string;
  user_id: string;
  username: string;
  profile_picture: string;
  video_url: string;
  thumbnail_url: string;
  title: string;
  description: string;
  views: number;
  duration: number;
  total_likes: number;
  total_dislikes: number;
  created_at: string;
}

export interface IVideoSmall {
  video_id: string;
  user_id: string;
  username: string;
  profile_picture: string;
  thumbnail_url: string;
  title: string;
  views: number;
  createdAt: string;
}

export const getVideos = async () => {
  const response = await db.query(
    'SELECT v.video_id, v.user_id, v.video_url, v.thumbnail_url, v.title, v.views, v.created_at, u.username, u.profile_picture FROM videos v JOIN users u ON v.user_id = u.user_id ORDER BY v.created_at DESC',
    []
  );
  const data: IVideoSmall[] = response.rows;
  return data;
};

export const getUserVideos = async (user_id: string) => {
  const response = await db.query(
    'SELECT * FROM videos WHERE user_id = $1 ORDER BY created_at DESC',
    [user_id]
  );
  const data: IVideo[] = response.rows;
  return data;
};

export const getVideo = async (video_id: string) => {
  const response = await db.query('SELECT * FROM get_video($1)', [video_id]);
  const data: {
    video_id: string;
    user_id: string;
    username: string;
    profile_picture: string;
    video_url: string;
    title: string;
    description: string;
    views: number;
    duration: number;
    total_likes: number;
    total_dislikes: number;
    created_at: string;
  } = response.rows[0];
  return data;
};

export const getVideoLikeStatus = async (video_id: string, user_id: string) => {
  const response = await db.query(
    'SELECT is_liked FROM video_likes WHERE video_id = $1 AND user_id = $2',
    [video_id, user_id]
  );
  const data: { is_liked: boolean } = response.rows[0];
  if (data === undefined) return { like_status: null };
  return { like_status: data.is_liked };
};

export const uploadVideo = async ({ path }: { path: string }) => {
  const response = await cloudinary.uploader.upload(path, {
    resource_type: 'video',
    upload_preset: 'youtube-clone-videos',
    chunk_size: 1000000,
  });
  return response;
};

export const saveVideoToDB = async (details: UploadVideoInput) => {
  const {
    user_id,
    title,
    description,
    duration,
    mimetype,
    thumbnail_url,
    video_url,
    tag_list,
  } = details;
  const response = await db.query(
    'SELECT * FROM create_video($1, $2, $3, $4, $5, $6, $7, $8)',
    [user_id, title, description, duration, mimetype, thumbnail_url, video_url, tag_list]
  );
  console.log(response);
  const video_id: string = response.rows[0];
  return video_id;
};

export const uploadThumbnail = async (thumbnail: string) => {
  const response = await cloudinary.uploader.upload(thumbnail, {
    resource_type: 'image',
    upload_preset: 'youtube-clone-video-thumbnails',
  });
  return response;
};

export const changeVideoThumbnail = async (
  current_thumbnail_url: string,
  new_thumbnail_base64: string
) => {
  const public_id = getImagePublicId(current_thumbnail_url);
  await cloudinary.uploader.destroy(public_id);
  const response = await cloudinary.uploader.upload(new_thumbnail_base64, {
    resource_type: 'image',
    upload_preset: 'youtube-clone-video-thumbnails',
  });
  return response.secure_url;
};

export const updateVideo = async (
  videoData: {
    video_id: string;
    title: string;
    description: string;
    thumbnail_data: {
      current_thumbnail_url: string;
      new_thumbnail_base64: string | null;
    };
    tag_list: string[] | null;
  },
  user_id: string
): Promise<string | null> => {
  const video: QueryResult<{ video_id: string; user_id: string }> = await db.query(
    'SELECT video_id, user_id FROM videos WHERE video_id = $1 AND user_id = $2',
    [videoData.video_id, user_id]
  );

  if (video.rows[0].user_id !== user_id)
    throw new Error('You cannot update a video that is not yours dude');

  let new_thumbnail_url: string | null = null;

  if (videoData.thumbnail_data?.new_thumbnail_base64 !== null) {
    new_thumbnail_url = await changeVideoThumbnail(
      videoData.thumbnail_data.current_thumbnail_url,
      videoData.thumbnail_data.new_thumbnail_base64
    );
  }

  const response = await db.query('SELECT * FROM update_video ($1,$2,$3,$4,$5,$6)', [
    videoData.video_id,
    user_id,
    videoData.title,
    videoData.description,
    new_thumbnail_url
      ? new_thumbnail_url
      : videoData.thumbnail_data.current_thumbnail_url,
    videoData.tag_list,
  ]);

  return response.rows[0];
};

export const deleteVideo = async (video_id: string, user_id: string) => {
  const selectResponse = await db.query(
    'SELECT thumbnail_url, video_url FROM videos WHERE video_id = $1 AND user_id = $2',
    [video_id, user_id]
  );

  const videoData: IVideo = selectResponse.rows[0];

  const video_publicId = getVideoPublicId(videoData.video_url);
  const thumbnail_publicId = getImagePublicId(videoData.thumbnail_url);

  const deleteVideoResponse = await cloudinary.uploader.destroy(video_publicId, {
    resource_type: 'video',
  });

  if (deleteVideoResponse.result !== 'ok') throw new Error(`Could not delete video`);

  await cloudinary.uploader.destroy(thumbnail_publicId);

  const deleteResponse = await db.query(
    'DELETE FROM videos WHERE video_id = $1 AND user_id = $2 RETURNING video_id',
    [video_id, user_id]
  );
  const data: { video_id: string } = deleteResponse.rows[0];
  return data;
};

export const likeOrDislikeVideo = async (
  action_type: 'like' | 'dislike',
  video_id: string,
  user_id: string
) => {
  await db.query('SELECT * FROM like_or_dislike_video ($1,$2,$3)', [
    action_type,
    video_id,
    user_id,
  ]);
  return null;
};

export const getVideoTags = async (video_id: string) => {
  const response = await db.query(
    'SELECT t.name FROM videos_tags AS vt JOIN tags AS t ON vt.tag_id = t.tag_id WHERE vt.video_id = $1',
    [video_id]
  );
  const data: { name: string }[] = response.rows;
  const tags: string[] = [];
  data.forEach((tag) => {
    tags.push(tag.name);
  });
  return tags;
};