import React, { ChangeEvent, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../app/store';
import { UploadVideoSchemaType } from '../../../../../schemas/uploadVideo.schema';
import { Button } from '../../../../../ui/Button';
import { ErrorText } from '../../../../../ui/Text';
import { MODAL_LAST_FOCUSABLE_ELEMENT } from '../../../../../ui/Modal/Modal';
import UploadModalStage from '../../UploadModalStage/UploadModalStage';
import { ChooseVideoState__HiddenFileInput } from './ChooseVideoStage.styles';

interface Props {
  setUploadData: React.Dispatch<React.SetStateAction<UploadVideoSchemaType>>;
  handleChangeStage: (stage: 'choose' | 'details' | 'uploading' | 'result') => void;
  setVideoFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const ChooseVideoStage = ({ setUploadData, handleChangeStage, setVideoFile }: Props) => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const hiddenInput = useRef<any>();

  const [error, setError] = useState('');

  const handleChooseFile = async (event: ChangeEvent<HTMLInputElement>) => {
    setError('');
    if (!accessToken) return;

    if (!event.target.files) return;
    const video = event.target.files[0];

    const sizeInMb = parseInt((video.size / 1000000).toFixed(2));
    if (sizeInMb > 100) return setError('Video must be max 100mb in size');

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
    <UploadModalStage>
      {error && <ErrorText>{error}</ErrorText>}
      <Button
        variant="primary"
        onClick={handleClickHiddenInput}
        autoFocus={true}
        id={MODAL_LAST_FOCUSABLE_ELEMENT}
      >
        Select video
      </Button>
      <ChooseVideoState__HiddenFileInput
        ref={hiddenInput}
        type={'file'}
        accept=".mp4, .flv, .mov, .m4v"
        onChange={handleChooseFile}
      />
    </UploadModalStage>
  );
};

export default ChooseVideoStage;
