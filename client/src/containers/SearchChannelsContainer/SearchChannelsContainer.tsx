import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { searchChannels } from '../../api/users';
import { RootState } from '../../app/store';
import ChannelCard from '../../components/Cards/ChannelCard/ChannelCard';
import { Button } from '../../ui/Button';
import NoResultsMessage from '../../ui/NoResultsMessage';
import Spinner from '../../ui/Spinner';
import { ErrorText } from '../../ui/Text';
import styled from 'styled-components';

const SearchChannels__Container = styled.div``;

const SearchChannels__Channels = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: calc(var(--space-large) * 2) var(--space-large);
  margin-bottom: var(--space-large);
`;

const SearchChannelsContainer = () => {
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
    queryKey: ['search_channels', searchQuery],
    enabled: searchQuery !== '',
    queryFn: async ({ pageParam = 1000000000 }) =>
      searchChannels({ searchQuery, cursor: pageParam }),
    retry: false,
    staleTime: 1000 * 60 * 60, // 60 min
    getNextPageParam: (lastPage) =>
      lastPage.nextCursor !== 0 ? lastPage.nextCursor : false,
    refetchOnWindowFocus: false,
  });

  return (
    <SearchChannels__Container>
      {isError && (
        <ErrorText>
          {error instanceof AxiosError && error.response?.data.errors[0].message}
        </ErrorText>
      )}
      <SearchChannels__Channels>
        {data?.pages?.map((page) => {
          return page.data?.map((user) => {
            return <ChannelCard user={user} hideSubBtn />;
          });
        })}
      </SearchChannels__Channels>
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
    </SearchChannels__Container>
  );
};

export default SearchChannelsContainer;
