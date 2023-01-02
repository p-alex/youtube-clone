import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  IVideo,
  selectVideoToDelete,
  selectVideoToEdit,
  setLastFocusedManageVideoBtnId,
} from '../../../app/features/manageVideo';
import { Button } from '../../../ui/Button';
import { ManageVideoCardFunctions__Container } from './ManageVideoCardFunctions.styles';
import { v4 } from 'uuid';

const ManageVideoCardFunctions = ({ video }: { video: IVideo }) => {
  const dispatch = useDispatch();

  const EDIT_BTN_ID = useRef<string>(v4()).current;
  const DELETE_BTN_ID = useRef<string>(v4()).current;

  const handleSelectVideoToEdit = () => {
    dispatch(setLastFocusedManageVideoBtnId({ lastFocusedElementId: EDIT_BTN_ID }));
    dispatch(selectVideoToEdit({ video }));
  };

  const handleSelectVideoToDelete = () => {
    dispatch(setLastFocusedManageVideoBtnId({ lastFocusedElementId: DELETE_BTN_ID }));
    dispatch(selectVideoToDelete({ videoId: video.video_id }));
  };

  return (
    <ManageVideoCardFunctions__Container>
      <Button variant="normal" onClick={handleSelectVideoToEdit} id={EDIT_BTN_ID}>
        Edit
      </Button>
      <Button variant="danger" onClick={handleSelectVideoToDelete} id={DELETE_BTN_ID}>
        Delete
      </Button>
    </ManageVideoCardFunctions__Container>
  );
};

export default ManageVideoCardFunctions;
