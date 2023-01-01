import React, { useState, useEffect } from 'react';
import useAxiosWithRetry from '../../hooks/requestHooks/useAxiosWithRetry';
import Layout from '../../layout/Layout';
import { useRouter } from 'next/router';
import { IVideoSmallWithInfo } from '../../app/features/videoSlice';
import VideoCardWithInfo from '../../components/VideoCardWithInfo/VideoCardWithInfo';
import styled from 'styled-components';

const SearchPageContainer = styled.div`
  position: relative;
  max-width: 1080px;
  margin: auto;
`;

const SearchPage = () => {
  const router = useRouter();
  const query = router.query.query;
  const [videos, setVideos] = useState<IVideoSmallWithInfo[]>([]);

  const [searchVideos, { isLoading, errors }] = useAxiosWithRetry<
    {},
    { searchResults: IVideoSmallWithInfo[] }
  >(`api/videos/search/${query}`);

  const handleSearchVideos = async () => {
    const response = await searchVideos({});
    if (response.success && response.result) {
      setVideos(response.result.searchResults);
    }
  };

  useEffect(() => {
    handleSearchVideos();
  }, [query]);

  return (
    <Layout>
      <SearchPageContainer>
        {videos.map((video) => {
          return <VideoCardWithInfo key={video.video_id} video={video} />;
        })}
      </SearchPageContainer>
    </Layout>
  );
};

export default SearchPage;
