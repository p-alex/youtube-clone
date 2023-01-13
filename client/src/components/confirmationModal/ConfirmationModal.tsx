import React, { useRef } from 'react';
import useDisableScroll from '../../hooks/useDisableScroll';
import { Button } from '../../ui/Button';
import FocusTrapRedirectFocus from '../focusTrap';
import Modal from '../Modal/Modal';
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
  redirectToElementIdOnClose,
  btnName,
}: {
  title: string;
  message: string;
  toggle: () => void;
  func: () => void;
  isLoading: boolean;
  redirectToElementIdOnClose?: string;
  btnName: string;
}) => {
  useDisableScroll();

  const firstFocusableElement = useRef<HTMLButtonElement>(null);
  const lastFocusableElement = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    if (redirectToElementIdOnClose === undefined) return toggle();
    toggle();
    document.getElementById(redirectToElementIdOnClose)?.focus();
  };

  return (
    <Modal title={'Are you sure?'} width={300} handleClose={handleToggle}>
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
    </Modal>
  );
};

export default ConfirmationModal;
