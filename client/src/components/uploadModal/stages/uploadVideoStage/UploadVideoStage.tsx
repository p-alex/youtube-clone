import React from 'react';
import { MODAL_LAST_FOCUSABLE_ELEMENT } from '../../../Modal/Modal';
import UploadModalStage from '../../UploadModalStage/UploadModalStage';
import {
  UploadVideoStage__Progress,
  UploadVideoStage__Status,
  UploadVideoStage__UploadingContainer,
} from './UploadVideoStage.styles';

const UploadVideoStage = ({ uploadProgress }: { uploadProgress: number }) => {
  return (
    <UploadModalStage>
      <UploadVideoStage__UploadingContainer>
        <UploadVideoStage__Status
          tabIndex={0}
          aria-live="assertive"
          id={MODAL_LAST_FOCUSABLE_ELEMENT}
        >
          {uploadProgress !== 100 ? 'Uploading...' : 'Processing...'}
        </UploadVideoStage__Status>
        <UploadVideoStage__Progress>
          {uploadProgress.toFixed(0)}%
        </UploadVideoStage__Progress>
      </UploadVideoStage__UploadingContainer>
    </UploadModalStage>
  );
};

export default UploadVideoStage;
