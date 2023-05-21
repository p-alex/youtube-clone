import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { searchChannels } from "../../api/users";
import { RootState } from "../../app/store";
import ChannelCard from "../../components/Cards/ChannelCard/ChannelCard";
import { ErrorText } from "../../ui/Text";
import styled from "styled-components";

const SearchChannels__Container = styled.div``;

const SearchChannels__Channels = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: calc(var(--space-large) * 2) var(--space-large);
  margin-bottom: var(--space-large);
`;

const SearchChannelsContainer = () => {
  const searchQuery = useSelector(
    (state: RootState) => state.navbar.searchQuery
  );

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["search_channels", searchQuery],
    enabled: searchQuery !== "",
    queryFn: async () => searchChannels({ searchQuery }),
    retry: false,
    staleTime: 1000 * 60 * 60, // 60 min
    refetchOnWindowFocus: false,
  });

  return (
    <SearchChannels__Container>
      {isError && (
        <ErrorText>
          {error instanceof AxiosError &&
            error.response?.data.errors[0].message}
        </ErrorText>
      )}
      <SearchChannels__Channels>
        {data?.data?.map((user) => {
          return <ChannelCard user={user} hideSubBtn />;
        })}
      </SearchChannels__Channels>
    </SearchChannels__Container>
  );
};

export default SearchChannelsContainer;
