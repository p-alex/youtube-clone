import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  IVideo,
  removeVideo,
  resetVideoToDelete,
  setUserVideos,
} from '../../app/features/manageVideo';
import { RootState } from '../../app/store';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import EditVideoModal from '../../components/editVideoModal/EditVideoModal';
import ManageVideoCard from '../../components/manageVideoCard/ManageVideoCard';
import useAxiosWithRetry from '../../hooks/requestHooks/useAxiosWithRetry';
import Layout from '../../layout/Layout';
import { MOBILE_BREAK_POINT, NAV_BAR_HEIGHT } from '../../layout/style';

const Container = styled.div`
  position: relative;
  margin: calc(${NAV_BAR_HEIGHT}px + 20px) auto;
  max-width: 1200px;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    margin: calc(${NAV_BAR_HEIGHT}px + 20px) 10px;
  }
`;

const Title = styled.h2`
  color: ${(props) => props.theme.textColor};
  margin-bottom: 20px;
`;

const VideoCards = styled.div`
  display: grid;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 550px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;

const Manage = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const { videos, videoToEdit, videoToDelete, lastFocusedElement } = useSelector(
    (state: RootState) => state.manageVideos
  );
  const dispatch = useDispatch();

  const [getUserVideos, { isLoading }] = useAxiosWithRetry<{}, { videos: IVideo[] }>(
    'api/videos/manage/recent/0',
    'GET'
  );

  const [deleteVideo, { isLoading: isDeleteLoading }] = useAxiosWithRetry<
    { videoId: string },
    {}
  >('api/videos', 'DELETE');

  const handleGetUserVideos = async () => {
    const response = await getUserVideos({});
    if (response.result === null) return;
    dispatch(setUserVideos(response.result.videos));
  };

  const handleDeleteVideo = async () => {
    const { success } = await deleteVideo({ videoId: videoToDelete! });
    if (!success) return;
    dispatch(removeVideo({ video_id: videoToDelete! }));
    dispatch(resetVideoToDelete());
  };

  useEffect(() => {
    handleGetUserVideos();
  }, [auth]);

  return (
    <Layout>
      <AnimatePresence>
        {videoToDelete && (
          <ConfirmationModal
            title={'Delete video'}
            message={'Delete video permanently?'}
            toggle={() => dispatch(resetVideoToDelete())}
            func={handleDeleteVideo}
            btnName={'Delete'}
            redirectToElementIdOnClose={lastFocusedElement!}
            isLoading={isDeleteLoading}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {videoToEdit && <EditVideoModal video={videoToEdit} />}
      </AnimatePresence>
      <Container>
        <Title>Manage your videos</Title>
        <VideoCards>
          {videos.map((video) => {
            return <ManageVideoCard key={video.video_id} video={video} />;
          })}
        </VideoCards>
      </Container>
    </Layout>
  );
};

export default Manage;
