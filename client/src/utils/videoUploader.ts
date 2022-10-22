import axios from "axios";
import { UploadVideoData } from "../components/uploadModal/UploadModal";
import { DefaultResponse } from "../hooks/useAxios";
import { BASE_URL } from "./baseURL";
import { removeEmptyLinesFromString } from "./removeEmptyLinesFromString";

export const videoUploader = async (
  videoFile: File,
  body: UploadVideoData,
  accessToken: string,
  setProgress: React.Dispatch<React.SetStateAction<number>>
) => {
  const formData = new FormData();
  formData.append("videoFile", videoFile!);
  formData.append("userId", body.userId);
  formData.append("title", body.title);
  formData.append("description", removeEmptyLinesFromString(body.description));
  formData.append("duration", JSON.stringify(body.duration));
  formData.append("mimetype", body.mimetype);
  formData.append("thumbnailUrl", body.thumbnailUrl!);
  formData.append("videoUrl", "");
  formData.append("tagList", JSON.stringify(body.tagList));

  const response = await axios.post(`${BASE_URL}/api/videos`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`,
    },
    onUploadProgress: (progressEvent: any) => {
      setProgress((progressEvent.loaded / progressEvent.total) * 100);
    },
  });
  const result: DefaultResponse<{ video_url: string | null }> = response.data;
  return result;
};
