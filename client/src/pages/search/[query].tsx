import React, { useState, useEffect } from 'react';
import useAxiosWithRetry from '../../hooks/requestHooks/useAxiosWithRetry';
import Layout from '../../layout/Layout';
import { useRouter } from 'next/router';
import { IVideoSmallWithInfo } from '../../app/features/videoSlice';
import VideoCardWithInfo from '../../components/Cards/VideoCardWithInfo/VideoCardWithInfo';
import styled from 'styled-components';
import PageContainer from '../../containers/PageContainer/PageContainer';

const SearchPageContainer = styled.div`
  position: relative;
`;

const PAGE_TITLE = 'Search';

const SearchPage = () => {
  const router = useRouter();
  const query = router.query.query;
  const [videos, setVideos] = useState<IVideoSmallWithInfo[]>([]);

  const [searchVideos, { isLoading, errors }] = useAxiosWithRetry<
    {},
    { searchResults: IVideoSmallWithInfo[] }
  >('api/videos/search/' + query);

  const handleSearchVideos = async () => {
    const response = await searchVideos({});
    if (response.success && response.result) {
      setVideos(response.result.searchResults);
    }
  };

  useEffect(() => {
    if (!query) return;
    handleSearchVideos();
  }, [query]);

  return (
    <Layout head={{ title: PAGE_TITLE }}>
      <PageContainer title={PAGE_TITLE} width={1000}>
        <SearchPageContainer>
          {videos.map((video) => {
            return <VideoCardWithInfo key={video.video_id} video={video} />;
          })}
        </SearchPageContainer>
      </PageContainer>
    </Layout>
  );
};

export default SearchPage;
