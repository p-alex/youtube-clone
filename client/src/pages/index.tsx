import type { NextPage } from 'next';
import Layout from '../layout/Layout';
import PageContainer from '../containers/PageContainer/PageContainer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Button } from '../ui/Button';
import Spinner from '../ui/Spinner';
import { ErrorText } from '../ui/Text';
import { getVideos } from '../api/video';
import VideoCard from '../components/Cards/VideoCard/VideoCard';
import styled from 'styled-components';

const PAGE_TITLE = 'Discover';

const Homepage__Videos = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: calc(var(--space-large) * 4) var(--space-medium);
`;

const Home: NextPage = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['homepage-videos'],
    queryFn: ({ pageParam }) => getVideos({ pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return (
    <Layout
      head={{
        title: PAGE_TITLE,
      }}
    >
      {isLoading && <Spinner />}
      <PageContainer title={PAGE_TITLE}>
        {isError && (
          <ErrorText>
            {error instanceof AxiosError && error?.response?.data?.errors[0]?.message}
          </ErrorText>
        )}
        <Homepage__Videos>
          {data?.pages &&
            data.pages.map((page) => {
              return page.data.result?.videos.map((video) => {
                return (
                  <VideoCard key={video.video_id} withProfilePicture video={video} />
                );
              });
            })}
        </Homepage__Videos>

        {hasNextPage && (
          <Button variant="normal" onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Loading' : 'Load more'}
          </Button>
        )}
      </PageContainer>
    </Layout>
  );
};

export default Home;
