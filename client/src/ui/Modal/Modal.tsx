import { useRef, useEffect, useState } from 'react';
import useDisableScroll from '../../hooks/useDisableScroll';
import { MdClose } from 'react-icons/md';
import {
  Modal__Backdrop,
  Modal__CloseBtn,
  Modal__Container,
  Modal__Content,
  Modal__Header,
  Modal__Title,
  Modal__Wrapper,
} from './Modal.styles';
import FocusTrapRedirectFocus from '../../components/focusTrap';
import { motion } from 'framer-motion';

interface Props {
  title: string;
  width: number;
  handleClose?: () => void;
  lastFocusedBtn?: any;
  children: React.ReactNode;
}

export const MODAL_LAST_FOCUSABLE_ELEMENT = 'modal-last-focusable-element';

export const redirectFocusToLastFocusedElement = (element: any) => {
  element?.focus();
};

const Modal = ({
  title = 'Change profile picture',
  width = 600,
  handleClose,
  lastFocusedBtn,
  children,
}: Props) => {
  const [lastFocusableElement, setLastFocusableElement] = useState<any>(null);

  useDisableScroll();

  const firstFocusableElement = useRef<HTMLButtonElement>(null);

  const handleCloseModal = () => {
    handleClose && handleClose();
    redirectFocusToLastFocusedElement(lastFocusedBtn);
  };

  useEffect(() => {
    const modalContent = document.getElementById('modal-content')!;
    const buttons = modalContent.querySelectorAll('button');
    if (buttons.length !== 0) {
      setLastFocusableElement(buttons[buttons.length - 1]);
    } else {
      setLastFocusableElement(
        modalContent.querySelector(`#${MODAL_LAST_FOCUSABLE_ELEMENT}`)
      );
    }
  }, [title]);

  return (
    <Modal__Wrapper width={width}>
      <FocusTrapRedirectFocus element={{ current: lastFocusableElement }} />
      <Modal__Backdrop
        onClick={handleCloseModal}
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'just' }}
        exit={{ opacity: 0 }}
      ></Modal__Backdrop>
      <Modal__Container
        width={width}
        as={motion.div}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'just' }}
        exit={{ y: -10, opacity: 0 }}
      >
        <Modal__Header>
          <Modal__Title>{title}</Modal__Title>
          <Modal__CloseBtn onClick={handleCloseModal} ref={firstFocusableElement}>
            <MdClose />
          </Modal__CloseBtn>
        </Modal__Header>
        <Modal__Content id={'modal-content'}>{children}</Modal__Content>
      </Modal__Container>
      <FocusTrapRedirectFocus element={firstFocusableElement} />
    </Modal__Wrapper>
  );
};

export default Modal;
