import React from "react";
import { MdUnfoldMore } from "react-icons/md";
import { ToggleMobileCommentsBtn, Title } from "./style";
const ToggleMobileComments = ({
  total_comments,
  handleToggleMobileComments,
}: {
  total_comments: number;
  handleToggleMobileComments: () => void;
}) => {
  return (
    <div>
      <ToggleMobileCommentsBtn onClick={handleToggleMobileComments}>
        <Title>
          Comments <span>• {total_comments}</span>
        </Title>
        <MdUnfoldMore />
      </ToggleMobileCommentsBtn>
    </div>
  );
};

export default ToggleMobileComments;
