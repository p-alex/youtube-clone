import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeSortBy,
  incrementVideosPage,
  loadMoreProfileVideos,
  setProfileVideos,
} from '../../../app/features/profileSlice';
import { IVideoSmall } from '../../../app/features/videoSlice';
import { RootState } from '../../../app/store';
import useAxios from '../../../hooks/requestHooks/useAxios';
import { Button } from '../../../ui/Button';
import Spinner from '../../../ui/Spinner';
import VideoCard from '../../videoCard/VideoCard';
import {
  ProfileVideosTab__Container,
  ProfileVideosTab__SortBtn,
  ProfileVideosTab__SortBtnsContainer,
  ProfileVideosTab__VideoContainer,
} from './ProfileVideosTab.styles';

const ProfileVideosTab = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.profile.profileInfo!.user_id);
  const { sortBy, videos, page, limit } = useSelector(
    (state: RootState) => state.profile.videosTab
  );
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);

  const [
    getProfileVideos,
    { isLoading: isGetProfileVideosLoading, errors: getProfileVideosErrors },
  ] = useAxios<{}, { videos: IVideoSmall[] }>(
    'api/videos/user/' + userId + '/' + sortBy + '/' + page
  );

  const handleGetProfileVideos = async () => {
    const response = await getProfileVideos({});
    if (!response.success || !response.result) return;
    if (response.result.videos.length === limit) {
      setShowLoadMoreBtn(true);
    } else {
      setShowLoadMoreBtn(false);
    }
    dispatch(setProfileVideos({ videos: response.result.videos }));
  };

  const handleLoadMoreProfileVideos = async () => {
    const response = await getProfileVideos({});
    if (!response.success || !response.result) return;
    if (response.result.videos.length === limit) {
      setShowLoadMoreBtn(true);
    } else {
      setShowLoadMoreBtn(false);
    }
    dispatch(loadMoreProfileVideos({ videos: response.result.videos }));
  };

  const handleChangeSortBy = (sortBy: 'recent' | 'popular') => {
    dispatch(changeSortBy({ sortBy }));
  };

  const handleIncrementPage = () => {
    dispatch(incrementVideosPage());
  };

  useEffect(() => {
    if (page === 0) return;
    handleLoadMoreProfileVideos();
  }, [page]);

  useEffect(() => {
    handleGetProfileVideos();
  }, [sortBy]);

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
      {isGetProfileVideosLoading && <Spinner />}
      {!isGetProfileVideosLoading &&
        getProfileVideosErrors !== null &&
        getProfileVideosErrors.length > 0 && (
          <p>{getProfileVideosErrors !== null && getProfileVideosErrors[0]?.message}</p>
        )}
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
        <Button variant="normal" onClick={handleIncrementPage}>
          Load more
        </Button>
      )}
    </ProfileVideosTab__Container>
  );
};

export default ProfileVideosTab;
