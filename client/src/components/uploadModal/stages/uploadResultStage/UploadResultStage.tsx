import { useEffect } from 'react';
import {
  UploadResultStage__Container,
  UploadResultStage__Message,
  UploadResultStage__ResultContainer,
} from './UploadResultStage.styles';
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
    <UploadResultStage__Container>
      <UploadResultStage__ResultContainer>
        {result.success ? <MdDone /> : <MdError />}
        <UploadResultStage__Message
          ref={lastFocusableElement}
          tabIndex={0}
          aria-live="assertive"
        >
          {result.message}
        </UploadResultStage__Message>
      </UploadResultStage__ResultContainer>
    </UploadResultStage__Container>
  );
};

export default UploadResultStage;
