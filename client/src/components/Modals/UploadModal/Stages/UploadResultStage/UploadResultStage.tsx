import { useEffect } from 'react';
import {
  UploadResultStage__Message,
  UploadResultStage__ResultContainer,
} from './UploadResultStage.styles';
import { MdDone, MdError } from 'react-icons/md';
import { UploadResult } from '../../../../../hooks/useUploadModal';
import { MODAL_LAST_FOCUSABLE_ELEMENT } from '../../../../../ui/Modal/Modal';
import UploadModalStage from '../../UploadModalStage/UploadModalStage';
const UploadResultStage = ({ result }: { result: UploadResult }) => {
  useEffect(() => {
    document.getElementById(MODAL_LAST_FOCUSABLE_ELEMENT)?.focus();
  }, []);
  return (
    <UploadModalStage>
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
    </UploadModalStage>
  );
};

export default UploadResultStage;
