import React, { useEffect, useRef, useState } from 'react';
import {
  UploadModal__Container,
  UploadModal__Backdrop,
  UploadModal__Modal,
  UploadModal__Header,
  UploadModal__Title,
  UploadModal__CloseBtn,
} from './UploadModal.styles';
import { MdClose } from 'react-icons/md';
import ChooseVideoStage from './stages/chooseVideoStage/ChooseVideoStage';
import VideoDetailsStage from './stages/videoDetailsStage/VideoDetailsStage';
import UploadVideoStage from './stages/uploadVideoStage/UploadVideoStage';
import useDisableScroll from '../../hooks/useDisableScroll';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import UploadResultStage from './stages/uploadResultStage/UploadResultStage';
import FocusTrapRedirectFocus from '../focusTrap';
import { motion } from 'framer-motion';
import useRefreshToken from '../../hooks/useRefreshToken';
import { resetUser } from '../../app/features/authSlice';
import router from 'next/router';
import { videoUploader } from '../../utils/videoUploader';
import useZodVerifySchema from '../../hooks/useZodVerifySchema';
import {
  uploadVideoSchema,
  UploadVideoSchemaType,
} from '../../schemas/uploadVideo.schema';

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

export const convertToTagList = (tags: string) => {
  return Array.from(new Set(tags.split(/ ?, ?/)));
};

const UploadModal = ({
  handleToggleUploadModal,
}: {
  handleToggleUploadModal: () => void;
}) => {
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

  const firstFocusableElement = useRef<any>();
  const lastFocusableElement = useRef<any>();

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

  return (
    <UploadModal__Container>
      <UploadModal__Backdrop
        onClick={!isLoading ? handleToggleUploadModal : () => {}}
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'just' }}
        exit={{ opacity: 0 }}
      />
      <UploadModal__Modal
        as={motion.div}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'just' }}
        exit={{ y: -50, opacity: 0 }}
      >
        <FocusTrapRedirectFocus element={lastFocusableElement} />
        <UploadModal__Header>
          <UploadModal__Title>Upload video</UploadModal__Title>
          <UploadModal__CloseBtn
            onClick={!isLoading ? handleToggleUploadModal : () => {}}
            ref={firstFocusableElement}
            aria-label="Close upload model"
          >
            <MdClose />
          </UploadModal__CloseBtn>
        </UploadModal__Header>
        {stage === 'choose' && (
          <ChooseVideoStage
            setUploadData={setUploadData}
            handleChangeStage={handleChangeStage}
            setVideoFile={setVideoFile}
            lastFocusableElement={lastFocusableElement}
          />
        )}
        {stage === 'details' && (
          <VideoDetailsStage
            uploadData={uploadData}
            setUploadData={setUploadData}
            handleUploadVideo={(event: React.FormEvent) => handleUploadVideo(event)}
            lastFocusableElement={lastFocusableElement}
            fieldErrors={fieldErrors}
          />
        )}
        {stage === 'uploading' && (
          <UploadVideoStage
            uploadProgress={uploadProgress}
            lastFocusableElement={lastFocusableElement}
          />
        )}
        {stage === 'result' && (
          <UploadResultStage
            result={result!}
            lastFocusableElement={lastFocusableElement}
          />
        )}
        <FocusTrapRedirectFocus element={firstFocusableElement} />
      </UploadModal__Modal>
    </UploadModal__Container>
  );
};
export default UploadModal;
