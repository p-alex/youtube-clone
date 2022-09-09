import axios from 'axios';
import { UploadVideoData } from '../components/uploadModal/UploadModal';
import { DefaultResponse } from '../hooks/useAxios';
import { BASE_URL } from './baseURL';

export const videoUploader = async (
  videoFile: File,
  body: UploadVideoData,
  accessToken: string,
  setProgress: React.Dispatch<React.SetStateAction<number>>
) => {
  const formData = new FormData();
  formData.append('video_file', videoFile!);
  formData.append('user_id', body.user_id);
  formData.append('title', body.title);
  formData.append('description', body.description);
  formData.append('duration', JSON.stringify(body.duration));
  formData.append('mimetype', body.mimetype);
  formData.append('thumbnail_url', body.thumbnail_url!);
  formData.append('video_url', '');
  formData.append('tag_list', JSON.stringify(body.tag_list));

  const response = await axios.post(`${BASE_URL}/api/videos`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessToken}`,
    },
    onUploadProgress: (progressEvent: any) => {
      setProgress((progressEvent.loaded / progressEvent.total) * 100);
    },
  });
  const result: DefaultResponse<{ video_url: string | null }> = response.data;
  return result;
};
