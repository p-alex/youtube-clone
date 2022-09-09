import React from 'react';
import { UploadResult } from '../../UploadModal';
import { Container, Message, ResultContainer } from './style';
import { MdDone, MdError } from 'react-icons/md';
const UploadResultStage = ({
  result,
  lastFocusableElement,
}: {
  result: UploadResult;
  lastFocusableElement: React.MutableRefObject<any>;
}) => {
  return (
    <Container>
      <ResultContainer>
        {result.success ? <MdDone /> : <MdError />}
        <Message ref={lastFocusableElement}>{result.message}</Message>
      </ResultContainer>
    </Container>
  );
};

export default UploadResultStage;
