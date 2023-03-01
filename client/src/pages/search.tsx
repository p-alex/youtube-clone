import { useState } from 'react';
import styled from 'styled-components';
import Layout from '../layout/Layout';
import PageContainer from '../containers/PageContainer/PageContainer';
import FilterButton from '../ui/FilterButton';
import SearchVideosContainer from '../containers/SearchVideosContainer/SearchVideosContainer';
import SearchChannelsContainer from '../containers/SearchChannelsContainer/SearchChannelsContainer';

const SearchPageFiltersContainer = styled.div`
  display: flex;
  gap: var(--space-small);
  margin-bottom: var(--space-big);
`;

const PAGE_TITLE = 'Search';

type ActiveTab = 'videos' | 'channels';

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('videos');

  return (
    <Layout head={{ title: PAGE_TITLE }}>
      <PageContainer title={PAGE_TITLE} width={1000}>
        <SearchPageFiltersContainer>
          <FilterButton
            isActive={activeTab === 'videos'}
            onClick={() => setActiveTab('videos')}
          >
            Videos
          </FilterButton>
          <FilterButton
            isActive={activeTab === 'channels'}
            onClick={() => setActiveTab('channels')}
          >
            Channels
          </FilterButton>
        </SearchPageFiltersContainer>
        {activeTab === 'videos' && <SearchVideosContainer />}
        {activeTab === 'channels' && <SearchChannelsContainer />}
      </PageContainer>
    </Layout>
  );
};

export default SearchPage;
