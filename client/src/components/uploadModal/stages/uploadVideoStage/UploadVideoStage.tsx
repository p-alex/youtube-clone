import React from 'react';
import {
  UploadVideoStage__Container,
  UploadVideoStage__Progress,
  UploadVideoStage__Status,
  UploadVideoStage__UploadingContainer,
} from './UploadVideoStage.styles';

const UploadVideoStage = ({
  uploadProgress,
  lastFocusableElement,
}: {
  uploadProgress: number;
  lastFocusableElement: React.MutableRefObject<any>;
}) => {
  return (
    <UploadVideoStage__Container>
      <UploadVideoStage__UploadingContainer>
        <UploadVideoStage__Status
          tabIndex={0}
          ref={lastFocusableElement}
          aria-live="assertive"
        >
          {uploadProgress !== 100 ? 'Uploading...' : 'Processing...'}
        </UploadVideoStage__Status>
        <UploadVideoStage__Progress>
          {uploadProgress.toFixed(0)}%
        </UploadVideoStage__Progress>
      </UploadVideoStage__UploadingContainer>
    </UploadVideoStage__Container>
  );
};

export default UploadVideoStage;
