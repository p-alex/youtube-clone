import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectVideoToDelete,
  selectVideoToEdit,
} from '../../../app/features/manageVideo';
import { RootState } from '../../../app/store';
import useAxiosWithRetry from '../../../hooks/useAxiosWithRetry';
import { IVideo } from '../../../pages/manage/videos';
import { VideoFunctionButton, VideoFunctions } from './style';

const ManageVideoCardFunctions = ({ video }: { video: IVideo }) => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [deleteVideo] = useAxiosWithRetry('api/videos', {
    body: { video_id: video.video_id },
    method: 'DELETE',
    accessToken: auth.accessToken!,
  });

  const handleDeleteVideo = async () => {
    try {
      const response = await deleteVideo();
      if (!response.result) return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VideoFunctions>
      <VideoFunctionButton onClick={() => dispatch(selectVideoToEdit(video))}>
        Edit
      </VideoFunctionButton>
      <VideoFunctionButton onClick={() => dispatch(selectVideoToDelete(video.video_id))}>
        Delete
      </VideoFunctionButton>
    </VideoFunctions>
  );
};

export default ManageVideoCardFunctions;
