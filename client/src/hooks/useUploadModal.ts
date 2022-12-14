import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../app/features/authSlice';
import { RootState } from '../app/store';
import { uploadVideoSchema, UploadVideoSchemaType } from '../schemas/uploadVideo.schema';
import useRefreshToken from './authHooks/useRefreshToken';
import useDisableScroll from './useDisableScroll';
import useZodVerifySchema from './useZodVerifySchema';
import { useRouter } from 'next/router';
import { videoUploader } from '../utils/videoUploader';

export interface UploadVideoData {
  userId: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  tagList: string[];
  duration: number;
  mimetype: string;
}

export interface UploadResult {
  success: boolean;
  message: string;
}

const useUploadModal = () => {
  const router = useRouter();
  useDisableScroll();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [stage, setStage] = useState<'choose' | 'details' | 'uploading' | 'result'>(
    'choose'
  );
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadData, setUploadData] = useState<UploadVideoData>({
    userId: user!.user_id,
    thumbnailUrl: '',
    title: '',
    description: '',
    tagList: [],
    duration: 0,
    mimetype: '',
  });
  const refreshToken = useRefreshToken();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>();

  const { verify, fieldErrors } = useZodVerifySchema<UploadVideoSchemaType>(
    uploadVideoSchema,
    {
      thumbnailUrl: uploadData.thumbnailUrl,
      title: uploadData.title,
      description: uploadData.description,
      tags: uploadData.tagList,
    }
  );

  const handleUploadVideo = async (event: React.FormEvent) => {
    event.preventDefault();
    const isValid = verify();
    if (!isValid) return;
    const { result } = await refreshToken();
    if (!result) {
      dispatch(resetUser());
      router.push('/signin');
      return;
    }
    const accessToken = result.accessToken;
    setIsLoading(true);
    handleChangeStage('uploading');
    try {
      const uploadResponse = await videoUploader(
        videoFile!,
        uploadData,
        accessToken!,
        setUploadProgress
      );
      if (!uploadResponse.success)
        throw new Error('Something went wrong... Please try again later');
      setResult({ success: true, message: 'Video uploaded successfully!' });
      handleChangeStage('result');
    } catch (error: any) {
      setIsLoading(false);
      setResult({ success: false, message: error.message });
      handleChangeStage('result');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeStage = (stage: 'choose' | 'details' | 'uploading' | 'result') =>
    setStage(stage);

  const handleSetDuration = () => {
    const video = document.createElement('video');
    video.addEventListener('loadedmetadata', (event) => {
      setUploadData((prevState) => ({
        ...prevState,
        duration: video.duration,
      }));
    });
    video.src = URL.createObjectURL(videoFile!);
  };

  useEffect(() => {
    let isMounted = true;
    if (videoFile?.name && isMounted) {
      handleSetDuration();
    }
    return () => {
      isMounted = false;
    };
  }, [videoFile]);
  return {
    stage,
    setVideoFile,
    uploadData,
    setUploadData,
    uploadProgress,
    isLoading,
    result,
    handleChangeStage,
    handleUploadVideo,
    fieldErrors,
  };
};

export default useUploadModal;
