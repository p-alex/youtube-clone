import React, { ChangeEvent, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { PrimaryButton } from '../../../../ui/PrimaryBtn';
import { UploadVideoData } from '../../UploadModal';
import { Container, HiddenFileInput } from './style';

const ChooseVideoStage = ({
  setUploadData,
  handleChangeStage,
  setVideoFile,
  lastFocusableElement,
}: {
  setUploadData: React.Dispatch<React.SetStateAction<UploadVideoData>>;
  handleChangeStage: (stage: 'choose' | 'details' | 'uploading' | 'result') => void;
  setVideoFile: React.Dispatch<React.SetStateAction<File | null>>;
  lastFocusableElement: React.MutableRefObject<any>;
}) => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const hiddenInput = useRef<any>();

  const handleChooseFile = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!accessToken) return;

    if (!event.target.files) return;
    const video = event.target.files[0];

    const sizeInMb = parseInt((video.size / 1000000).toFixed(2));
    if (sizeInMb > 500) return;

    setVideoFile(video);

    setUploadData((prevState) => ({
      ...prevState,
      mimetype: video.type,
    }));

    handleChangeStage('details');
  };

  const handleClickHiddenInput = () => {
    hiddenInput.current.click();
  };

  return (
    <Container>
      <PrimaryButton
        onClick={handleClickHiddenInput}
        ref={lastFocusableElement}
        autoFocus={true}
      >
        Select video
      </PrimaryButton>
      <HiddenFileInput
        ref={hiddenInput}
        type={'file'}
        accept=".mp4, .flv, .mov, .m4v"
        onChange={handleChooseFile}
      />
    </Container>
  );
};

export default ChooseVideoStage;
