import { useRef } from 'react';
import {
  UploadModal__Container,
  UploadModal__Backdrop,
  UploadModal__Modal,
  UploadModal__Header,
  UploadModal__Title,
  UploadModal__CloseBtn,
} from './UploadModal.styles';
import { MdClose } from 'react-icons/md';
import FocusTrapRedirectFocus from '../focusTrap';
import { motion } from 'framer-motion';
import useUploadModal from '../../hooks/useUploadModal';
import ChooseVideoStage from './stages/ChooseVideoStage/ChooseVideoStage';
import VideoDetailsStage from './stages/VideoDetailsStage/VideoDetailsStage';
import UploadVideoStage from './stages/UploadVideoStage/UploadVideoStage';
import UploadResultStage from './stages/UploadResultStage/UploadResultStage';

const UploadModal = ({
  handleToggleUploadModal,
}: {
  handleToggleUploadModal: () => void;
}) => {
  const {
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
  } = useUploadModal();
  const firstFocusableElement = useRef<any>();
  const lastFocusableElement = useRef<any>();
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
