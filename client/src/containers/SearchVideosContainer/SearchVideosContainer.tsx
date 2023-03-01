import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { searchVideos } from '../../api/video';
import { RootState } from '../../app/store';
import VideoCardWithInfo from '../../components/Cards/VideoCardWithInfo/VideoCardWithInfo';
import { Button } from '../../ui/Button';
import NoResultsMessage from '../../ui/NoResultsMessage';
import Spinner from '../../ui/Spinner';
import { ErrorText } from '../../ui/Text';

const SearchVideosContainer = () => {
  const searchQuery = useSelector((state: RootState) => state.navbar.searchQuery);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['search_videos', searchQuery],
    enabled: searchQuery !== '',
    retry: false,
    queryFn: async ({ pageParam = 1 }) =>
      searchVideos({ searchQuery, cursor: pageParam }),
    staleTime: 1000 * 60 * 60, // 60 min
    getNextPageParam: (lastPage) =>
      lastPage.nextCursor !== 0 ? lastPage.nextCursor : false,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      {isError && (
        <ErrorText>
          {error instanceof AxiosError && error.response?.data.errors[0].message}
        </ErrorText>
      )}
      {data?.pages.map((page) => {
        return page.data?.map((video) => {
          return <VideoCardWithInfo video={video} />;
        });
      })}
      {!data?.pages[0].data?.length && !data?.pages[0]?.nextCursor && (
        <NoResultsMessage />
      )}
      {isFetching || (isFetchingNextPage && <Spinner />)}
      {hasNextPage && (
        <Button
          variant="normal"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isLoading ? 'Loading' : 'Load more'}
        </Button>
      )}
    </div>
  );
};

export default SearchVideosContainer;
