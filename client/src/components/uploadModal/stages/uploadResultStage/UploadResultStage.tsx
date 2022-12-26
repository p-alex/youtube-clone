import { useEffect } from 'react';
import { Container, Message, ResultContainer } from './style';
import { MdDone, MdError } from 'react-icons/md';
import { UploadResult } from '../../../../hooks/useUploadModal';
const UploadResultStage = ({
  result,
  lastFocusableElement,
}: {
  result: UploadResult;
  lastFocusableElement: React.MutableRefObject<any>;
}) => {
  useEffect(() => {
    lastFocusableElement.current.focus();
  }, []);
  return (
    <Container>
      <ResultContainer>
        {result.success ? <MdDone /> : <MdError />}
        <Message ref={lastFocusableElement} tabIndex={0} aria-live="assertive">
          {result.message}
        </Message>
      </ResultContainer>
    </Container>
  );
};

export default UploadResultStage;
