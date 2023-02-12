import { AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  IVideo,
  removeVideo,
  resetVideoToDelete,
  setUserVideos,
} from '../../app/features/manageVideo';
import { RootState } from '../../app/store';
import ManageVideoCard from '../../components/Cards/ManageVideoCard/ManageVideoCard';
import ConfirmationModal from '../../components/Modals/ConfirmationModal/ConfirmationModal';
import EditVideoModal from '../../components/Modals/EditVideoModal/EditVideoModal';
import PageContainer from '../../containers/PageContainer/PageContainer';
import useAxiosWithRetry from '../../hooks/requestHooks/useAxiosWithRetry';
import useProtectRoute from '../../hooks/useProtectRoute';
import Layout from '../../layout/Layout';
import { ManageVideosPage__VideoCards } from '../../pageStyles/ManageVideosPage.styles';

const PAGE_TITLE = 'Manage your videos';

const ManageVideosPage = () => {
  useProtectRoute();
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
    <Layout head={{ title: PAGE_TITLE }}>
      <PageContainer title={PAGE_TITLE}>
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
        <ManageVideosPage__VideoCards>
          {videos.map((video) => {
            return <ManageVideoCard key={video.video_id} video={video} />;
          })}
        </ManageVideosPage__VideoCards>
      </PageContainer>
    </Layout>
  );
};

export default ManageVideosPage;
