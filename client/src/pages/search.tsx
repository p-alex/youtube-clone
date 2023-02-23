import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IVideoSmallWithInfo } from '../app/features/videoSlice';
import useAxiosWithRetry from '../hooks/requestHooks/useAxiosWithRetry';
import Layout from '../layout/Layout';
import PageContainer from '../containers/PageContainer/PageContainer';
import FilterButton from '../ui/FilterButton';
import VideoCardWithInfo from '../components/Cards/VideoCardWithInfo/VideoCardWithInfo';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const SearchPageContainer = styled.div`
  position: relative;
`;

const SearchPageFiltersContainer = styled.div`
  display: flex;
  gap: var(--space-small);
`;

const PAGE_TITLE = 'Search';

type ActiveTab = 'videos' | 'channels';

const SearchPage = () => {
  const searchQuery = useSelector((state: RootState) => state.navbar.searchQuery);
  const [videos, setVideos] = useState<IVideoSmallWithInfo[]>([]);
  const [channels, setChannels] = useState();

  const [activeTab, setActiveTab] = useState<ActiveTab>('videos');

  const handleChangeActiveTab = (tab: ActiveTab) => {
    setActiveTab(tab);
  };

  const [searchVideos, { isLoading: isSearchVideosLoading, errors: searchVideosErrors }] =
    useAxiosWithRetry<{}, { searchResults: IVideoSmallWithInfo[] }>(
      'api/videos/search/' + searchQuery
    );

  const handleSearchVideos = async () => {
    const response = await searchVideos({});
    if (response.success && response.result) {
      setVideos(response.result.searchResults);
    }
  };

  useEffect(() => {
    if (!searchQuery) return;
    handleSearchVideos();
  }, [searchQuery]);

  return (
    <Layout head={{ title: PAGE_TITLE }}>
      <PageContainer title={PAGE_TITLE} width={1000}>
        <SearchPageFiltersContainer>
          <FilterButton
            isActive={activeTab === 'videos'}
            onClick={() => handleChangeActiveTab('videos')}
          >
            Videos
          </FilterButton>
          <FilterButton
            isActive={activeTab === 'channels'}
            onClick={() => handleChangeActiveTab('channels')}
          >
            Channels
          </FilterButton>
        </SearchPageFiltersContainer>
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
