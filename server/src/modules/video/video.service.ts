import { AddNewVideoInput } from './video.schema';
import { cloudinary } from '../../cloudinary';
import db from '../../db';

export const uploadVideo = async ({ path }: { path: string }) => {
  const response = await cloudinary.uploader.upload(path, {
    resource_type: 'video',
    upload_preset: 'youtube-clone-videos',
    chunk_size: 6000000,
  });
  return response;
};

export const addVideo = async (details: AddNewVideoInput) => {
  const { user_id, title, description, tags, duration, mimeType, thumbnail, video_url } =
    details;
  const response = await db.query(
    'INSERT INTO video (user_id, title, description, tags, duration, mimeType, thumbnail, video_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING video_id',
    [user_id, title, description, tags, duration, mimeType, thumbnail, video_url]
  );
  const data: { video_url: string } = response.rows[0];
  return data;
};

export const uploadThumbnail = async (thumbnail: string) => {
  const response = await cloudinary.uploader.upload(thumbnail, {
    resource_type: 'image',
    upload_preset: 'youtube-clone-video-thumbnails',
  });
  return response;
};
