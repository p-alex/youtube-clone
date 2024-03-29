import axios from 'axios';
import { DefaultResponse } from '../hooks/requestHooks/useAxiosWithRetry';
import { UploadVideoSchemaType } from '../schemas/uploadVideo.schema';
import { removeEmptyLinesFromString } from './removeEmptyLinesFromString';

export const videoUploader = async (
  videoFile: File,
  body: UploadVideoSchemaType,
  accessToken: string,
  setProgress: React.Dispatch<React.SetStateAction<number>>
) => {
  const formData = new FormData();
  formData.append('videoFile', videoFile!);
  formData.append('userId', body.userId);
  formData.append('title', body.title);
  formData.append('description', removeEmptyLinesFromString(body.description));
  formData.append('duration', JSON.stringify(body.duration));
  formData.append('mimetype', body.mimetype);
  formData.append('thumbnailUrl', body.thumbnailUrl!);
  formData.append('videoUrl', '');
  formData.append('tagList', JSON.stringify(body.tagList));
  formData.append('sizeInMb', JSON.stringify(body.sizeInMb));
  formData.append('reToken', body.reToken);

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/videos`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
      onUploadProgress: (progressEvent: any) => {
        setProgress((progressEvent.loaded / progressEvent.total) * 100);
      },
    }
  );
  const result: DefaultResponse<{ video_url: string | null }> = response.data;
  return result;
};
