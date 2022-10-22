import React from "react";
import { useDispatch } from "react-redux";
import {
  IVideo,
  selectVideoToDelete,
  selectVideoToEdit,
} from "../../../app/features/manageVideo";
import { Button } from "../../../ui/Button";
import { VideoFunctions } from "./style";

const ManageVideoCardFunctions = ({
  video,
  deleteBtnRef,
}: {
  video: IVideo;
  deleteBtnRef: React.RefObject<HTMLButtonElement>;
}) => {
  const dispatch = useDispatch();

  return (
    <VideoFunctions>
      <Button
        variant="normal"
        onClick={() => dispatch(selectVideoToEdit(video))}
      >
        Edit
      </Button>
      <Button
        variant="danger"
        onClick={() => dispatch(selectVideoToDelete(video.video_id))}
        ref={deleteBtnRef}
      >
        Delete
      </Button>
    </VideoFunctions>
  );
};

export default ManageVideoCardFunctions;
