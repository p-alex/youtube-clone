import React, { useRef } from 'react';
import useDisableScroll from '../../hooks/useDisableScroll';
import { Button } from '../../ui/Button';
import FocusTrapRedirectFocus from '../focusTrap';
import {
  ConfirmationModalBackdrop,
  ConfirmationModalButtons,
  ConfirmationModalContainer,
  ConfirmationModalMessage,
  ConfirmationModalTitle,
  ConfirmationModalWrapper,
} from './ConfirmationModal.styles';

const ConfirmationModal = ({
  title,
  message,
  toggle,
  func,
  isLoading,
  redirectToElementOnClose,
  btnName,
}: {
  title: string;
  message: string;
  toggle: () => void;
  func: () => void;
  isLoading: boolean;
  redirectToElementOnClose?: React.RefObject<HTMLButtonElement>;
  btnName: string;
}) => {
  useDisableScroll();

  const firstFocusableElement = useRef<HTMLButtonElement>(null);
  const lastFocusableElement = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    if (redirectToElementOnClose === undefined) return toggle();
    toggle();
    redirectToElementOnClose.current?.focus();
  };

  return (
    <ConfirmationModalWrapper>
      <FocusTrapRedirectFocus element={lastFocusableElement} />
      <ConfirmationModalBackdrop onClick={handleToggle} />
      <ConfirmationModalContainer>
        <ConfirmationModalTitle>{title}</ConfirmationModalTitle>
        <ConfirmationModalMessage>{message}</ConfirmationModalMessage>
        <ConfirmationModalButtons>
          <Button
            variant="normal"
            onClick={handleToggle}
            autoFocus
            ref={firstFocusableElement}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={func} ref={lastFocusableElement}>
            Delete
          </Button>
        </ConfirmationModalButtons>
      </ConfirmationModalContainer>
      <FocusTrapRedirectFocus element={firstFocusableElement} />
    </ConfirmationModalWrapper>
  );
};

export default ConfirmationModal;
