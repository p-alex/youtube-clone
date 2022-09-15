import { motion } from "framer-motion";
import React, { useRef } from "react";
import useDisableScroll from "../../hooks/useDisableScroll";
import { Button } from "../../ui/Button";
import FocusTrapRedirectFocus from "../focusTrap";
import {
  ConfirmBackdrop,
  ConfirmButtons,
  ConfirmContainer,
  ConfirmDelete,
  Message,
} from "./style";

const ConfirmationModal = ({
  toggleModal,
  func,
  btnName,
  modalMessage,
  redirectOnCancelTo,
}: {
  toggleModal: () => void;
  func: () => void;
  btnName: string;
  modalMessage?: string;
  redirectOnCancelTo: React.RefObject<HTMLButtonElement>;
}) => {
  useDisableScroll();

  const handleCloseModal = () => {
    toggleModal();
    redirectOnCancelTo.current?.focus();
  };

  const firstFocusableElement = useRef<HTMLButtonElement>(null);
  const lastFocusableElement = useRef<HTMLButtonElement>(null);

  return (
    <ConfirmDelete
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "just" }}
      exit={{ opacity: 0 }}
    >
      <FocusTrapRedirectFocus element={lastFocusableElement} />
      <ConfirmBackdrop onClick={handleCloseModal}></ConfirmBackdrop>
      <ConfirmContainer>
        <Message>{modalMessage ? modalMessage : "Are you sure?"}</Message>
        <ConfirmButtons>
          <Button
            variant="normal"
            onClick={handleCloseModal}
            ref={firstFocusableElement}
            autoFocus={true}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={func} ref={lastFocusableElement}>
            {btnName}
          </Button>
        </ConfirmButtons>
      </ConfirmContainer>
      <FocusTrapRedirectFocus element={firstFocusableElement} />
    </ConfirmDelete>
  );
};

export default ConfirmationModal;
