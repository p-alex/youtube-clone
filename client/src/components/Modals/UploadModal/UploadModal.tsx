import useUploadModal from '../../../hooks/useUploadModal';
import Modal from '../../../ui/Modal/Modal';
import ChooseVideoStage from './Stages/ChooseVideoStage/ChooseVideoStage';
import UploadResultStage from './Stages/UploadResultStage/UploadResultStage';
import UploadVideoStage from './Stages/UploadVideoStage/UploadVideoStage';
import VideoDetailsStage from './Stages/VideoDetailsStage/VideoDetailsStage';

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
    reRef,
  } = useUploadModal();
  return (
    <Modal title={stage} width={600} handleClose={handleToggleUploadModal}>
      {stage === 'choose' && (
        <ChooseVideoStage
          setUploadData={setUploadData}
          handleChangeStage={handleChangeStage}
          setVideoFile={setVideoFile}
        />
      )}
      {stage === 'details' && (
        <VideoDetailsStage
          uploadData={uploadData}
          setUploadData={setUploadData}
          handleUploadVideo={(event: React.FormEvent) => handleUploadVideo(event)}
          fieldErrors={fieldErrors}
          reRef={reRef}
        />
      )}
      {stage === 'uploading' && <UploadVideoStage uploadProgress={uploadProgress} />}
      {stage === 'result' && <UploadResultStage result={result!} />}
    </Modal>
  );
};
export default UploadModal;
