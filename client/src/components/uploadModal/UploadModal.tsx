import React, { useEffect, useRef, useState } from 'react';
import { Backdrop, CloseBtn, Container, Header, Title, Modal } from './style';
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

export interface UploadVideoData {
  user_id: string;
  thumbnail_url: string | null;
  title: string;
  description: string;
  tag_list: string[];
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
    user_id: user!.user_id,
    thumbnail_url: null,
    title: '',
    description: '',
    tag_list: [],
    duration: 0,
    mimetype: '',
  });
  const refreshToken = useRefreshToken();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>();

  const firstFocusableElement = useRef<any>();
  const lastFocusableElement = useRef<any>();

  const handleUploadVideo = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !uploadData.title ||
      uploadData.tag_list.length < 4 ||
      !uploadData.thumbnail_url ||
      !videoFile
    )
      return;
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
        videoFile,
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
      setUploadData((prevState) => ({ ...prevState, duration: video.duration }));
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

  console.log(videoFile);

  return (
    <Container>
      <Backdrop
        onClick={!isLoading ? handleToggleUploadModal : () => {}}
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'just' }}
        exit={{ opacity: 0 }}
      />
      <Modal
        as={motion.div}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'just' }}
        exit={{ y: -50, opacity: 0 }}
      >
        <FocusTrapRedirectFocus element={lastFocusableElement} />
        <Header>
          <Title>Upload video</Title>
          <CloseBtn
            onClick={!isLoading ? handleToggleUploadModal : () => {}}
            ref={firstFocusableElement}
            aria-label="Close upload model"
          >
            <MdClose />
          </CloseBtn>
        </Header>
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
      </Modal>
    </Container>
  );
};
export default UploadModal;
