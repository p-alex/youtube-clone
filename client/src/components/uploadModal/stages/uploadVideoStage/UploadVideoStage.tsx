import React from 'react';
import { Container, Progress, Status, UploadingContainer } from './style';

const UploadVideoStage = ({
  uploadProgress,
  lastFocusableElement,
}: {
  uploadProgress: number;
  lastFocusableElement: React.MutableRefObject<any>;
}) => {
  return (
    <Container>
      <UploadingContainer>
        <Status tabIndex={0} ref={lastFocusableElement}>
          {uploadProgress !== 100 ? 'Uploading...' : 'Processing...'}
        </Status>
        <Progress>{uploadProgress.toFixed(2)}%</Progress>
      </UploadingContainer>
    </Container>
  );
};

export default UploadVideoStage;
