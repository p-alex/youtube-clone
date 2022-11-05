import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineMore } from 'react-icons/ai';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';
import { BORDER_RADIUS_ROUND } from '../layout/style';

const CommentDropDownWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const CommentDropDownContainer = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  background-color: ${(props) => props.theme.uiSecondaryBg};
  border-radius: ${BORDER_RADIUS_ROUND}px;
  padding: 10px 0;
`;

const CommentDropDownToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  & svg {
    color: ${(props) => props.theme.textColor};
  }
`;

const CommentDropDownBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 15px;
  width: 100%;
  text-align: left;
  color: ${(props) => props.theme.textColor};
  font-size: 0.8rem;
  & svg {
    font-size: 1.2rem;
  }
  &:hover {
    background-color: ${(props) => props.theme.normalBtn.bgHover};
  }
`;

const CommentDropDown = ({
  handleSetToEdit,
  handleSetToDelete,
}: {
  handleSetToEdit: () => void;
  handleSetToDelete: () => void;
}) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const setToEdit = () => {
    handleSetToEdit();
    setShowDropDown(false);
  };
  const setToDelete = () => {
    handleSetToDelete();
    setShowDropDown(false);
  };
  return (
    <CommentDropDownWrapper>
      <CommentDropDownToggle
        aria-label={'Toggle comment options'}
        onClick={() => setShowDropDown((prevState) => !prevState)}
      >
        <AiOutlineMore />
      </CommentDropDownToggle>
      {showDropDown && (
        <CommentDropDownContainer>
          <CommentDropDownBtn onClick={setToEdit}>
            <MdEdit /> EDIT
          </CommentDropDownBtn>
          <CommentDropDownBtn onClick={setToDelete}>
            <MdDeleteOutline /> DELETE
          </CommentDropDownBtn>
        </CommentDropDownContainer>
      )}
    </CommentDropDownWrapper>
  );
};

export default CommentDropDown;
