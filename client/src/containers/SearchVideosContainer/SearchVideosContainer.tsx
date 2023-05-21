import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { searchVideos } from "../../api/video";
import { RootState } from "../../app/store";
import { ErrorText } from "../../ui/Text";
import VideoCardWithInfo from "../../components/Cards/VideoCardWithInfo/VideoCardWithInfo";

const SearchVideosContainer = () => {
  const searchQuery = useSelector(
    (state: RootState) => state.navbar.searchQuery
  );

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["search_videos", searchQuery],
    enabled: searchQuery !== "",
    retry: false,
    queryFn: async () => searchVideos({ searchQuery }),
    staleTime: 1000 * 60 * 60, // 60 min
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      {isError && (
        <ErrorText>
          {error instanceof AxiosError &&
            error.response?.data.errors[0].message}
        </ErrorText>
      )}
      {data?.data?.map((video) => {
        return <VideoCardWithInfo key={video.video_id} video={video} />;
      })}
    </div>
  );
};

export default SearchVideosContainer;
