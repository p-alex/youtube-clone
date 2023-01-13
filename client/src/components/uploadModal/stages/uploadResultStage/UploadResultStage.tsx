import { useEffect } from 'react';
import {
  UploadResultStage__Container,
  UploadResultStage__Message,
  UploadResultStage__ResultContainer,
} from './UploadResultStage.styles';
import { MdDone, MdError } from 'react-icons/md';
import { UploadResult } from '../../../../hooks/useUploadModal';
import { MODAL_LAST_FOCUSABLE_ELEMENT } from '../../../Modal/Modal';
const UploadResultStage = ({ result }: { result: UploadResult }) => {
  useEffect(() => {
    document.getElementById(MODAL_LAST_FOCUSABLE_ELEMENT)?.focus();
  }, []);
  return (
    <UploadResultStage__Container>
      <UploadResultStage__ResultContainer>
        {result.success ? <MdDone /> : <MdError />}
        <UploadResultStage__Message
          tabIndex={0}
          aria-live="assertive"
          id={MODAL_LAST_FOCUSABLE_ELEMENT}
        >
          {result.message}
        </UploadResultStage__Message>
      </UploadResultStage__ResultContainer>
    </UploadResultStage__Container>
  );
};

export default UploadResultStage;
