import React from 'react';
import { MdUnfoldMore } from 'react-icons/md';
import { ToggleMobileCommentsBtn, Title } from './style';
const ToggleMobileComments = ({
  handleToggleMobileComments,
}: {
  handleToggleMobileComments: () => void;
}) => {
  return (
    <div>
      <ToggleMobileCommentsBtn onClick={handleToggleMobileComments}>
        <Title>
          Comments <span>• 382</span>
        </Title>
        <MdUnfoldMore />
      </ToggleMobileCommentsBtn>
    </div>
  );
};

export default ToggleMobileComments;
