import React from 'react';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
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
        <UnfoldMoreIcon />
      </ToggleMobileCommentsBtn>
    </div>
  );
};

export default ToggleMobileComments;
