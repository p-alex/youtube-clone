import useUploadModal from '../../hooks/useUploadModal';
import ChooseVideoStage from './stages/ChooseVideoStage/ChooseVideoStage';
import VideoDetailsStage from './stages/VideoDetailsStage/VideoDetailsStage';
import UploadVideoStage from './stages/UploadVideoStage/UploadVideoStage';
import UploadResultStage from './stages/UploadResultStage/UploadResultStage';
import Modal from '../Modal/Modal';

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
        />
      )}
      {stage === 'uploading' && <UploadVideoStage uploadProgress={uploadProgress} />}
      {stage === 'result' && <UploadResultStage result={result!} />}
    </Modal>
  );
};
export default UploadModal;
