import { motion } from "framer-motion";
import React from "react";
import useDisableScroll from "../../hooks/useDisableScroll";
import { Button } from "../../ui/Button";
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
}: {
  toggleModal: () => void;
  func: () => void;
  btnName: string;
  modalMessage: string;
}) => {
  useDisableScroll();
  return (
    <ConfirmDelete
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "just" }}
      exit={{ opacity: 0 }}
    >
      <ConfirmBackdrop onClick={toggleModal}></ConfirmBackdrop>
      <ConfirmContainer>
        <Message>{modalMessage}</Message>
        <ConfirmButtons>
          <Button variant="normal" onClick={toggleModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={func}>
            {btnName}
          </Button>
        </ConfirmButtons>
      </ConfirmContainer>
    </ConfirmDelete>
  );
};

export default ConfirmationModal;
