import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeProfileVideosSortBy,
  incrementVideosPage,
  loadMoreProfileVideos,
} from '../../../app/features/profileSlice';
import { IVideoSmall } from '../../../app/features/videoSlice';
import { RootState } from '../../../app/store';
import { DefaultResponse } from '../../../hooks/requestHooks/useAxiosWithRetry';
import { Button } from '../../../ui/Button';
import Spinner from '../../../ui/Spinner';
import VideoCard from '../../VideoCard/VideoCard';
import {
  ProfileVideosTab__Container,
  ProfileVideosTab__SortBtn,
  ProfileVideosTab__SortBtnsContainer,
  ProfileVideosTab__VideoContainer,
} from './ProfileVideosTab.styles';

interface Props {
  getProfileVideosRequest: (body: {}) => Promise<
    DefaultResponse<{
      videos: IVideoSmall[];
    } | null>
  >;
  isGetProfileVideosLoading: boolean;
}

const ProfileVideosTab = ({
  getProfileVideosRequest,
  isGetProfileVideosLoading,
}: Props) => {
  const dispatch = useDispatch();

  const { limit, page, videos, sortBy } = useSelector(
    (state: RootState) => state.profile.videosTab
  );

  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);

  const handleLoadMoreProfileVideos = async () => {
    const response = await getProfileVideosRequest({});
    if (!response.success || !response.result) return;
    dispatch(loadMoreProfileVideos({ videos: response.result.videos }));
  };

  const handleChangeSortBy = (sortBy: 'recent' | 'popular') => {
    dispatch(changeProfileVideosSortBy({ sortBy }));
  };

  const handleIncrementVideosPage = () => {
    dispatch(incrementVideosPage());
  };

  useEffect(() => {
    if (page === 0) return;
    handleLoadMoreProfileVideos();
  }, [page]);

  return (
    <ProfileVideosTab__Container>
      <ProfileVideosTab__SortBtnsContainer>
        <ProfileVideosTab__SortBtn
          isActive={sortBy === 'recent'}
          onClick={() => handleChangeSortBy('recent')}
        >
          Recently uploaded
        </ProfileVideosTab__SortBtn>
        <ProfileVideosTab__SortBtn
          isActive={sortBy === 'popular'}
          onClick={() => handleChangeSortBy('popular')}
        >
          Popular
        </ProfileVideosTab__SortBtn>
      </ProfileVideosTab__SortBtnsContainer>
      {isGetProfileVideosLoading && videos.length === 0 && <Spinner />}
      {!isGetProfileVideosLoading && !isGetProfileVideosLoading && (
        <ProfileVideosTab__VideoContainer>
          {videos.map((video) => {
            return (
              <VideoCard key={video.video_id} video={video} withProfilePicture={false} />
            );
          })}
        </ProfileVideosTab__VideoContainer>
      )}
      {showLoadMoreBtn && (
        <Button variant="normal" onClick={handleIncrementVideosPage}>
          Load more
        </Button>
      )}
    </ProfileVideosTab__Container>
  );
};

export default ProfileVideosTab;
