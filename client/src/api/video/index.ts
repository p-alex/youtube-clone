import axios from 'axios';
import { IVideoSmall, IVideoSmallWithInfoRanked } from '../../app/features/videoSlice';
import { DefaultResponse } from '../../hooks/requestHooks/useAxiosWithRetry';

export const getVideos = ({ pageParam = 0 }) =>
  axios
    .get<DefaultResponse<{ videos: IVideoSmall[]; nextPage: number }>>(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/videos?page=${pageParam}`
    )
    .then((res) => {
      return { data: res.data, nextPage: res.data.result?.nextPage };
    });

export const searchVideos = async ({
  searchQuery,
  pageParam,
}: {
  searchQuery: string;
  pageParam: number;
}) => {
  const response = await axios.get<
    DefaultResponse<{ searchResults: IVideoSmallWithInfoRanked[]; nextPage: number }>
  >(
    process.env.NEXT_PUBLIC_SERVER_BASE_URL! +
      '/api/videos/search?query=' +
      searchQuery +
      '&page=' +
      pageParam
  );
  const result = {
    data: response.data.result?.searchResults,
    nextPage: response.data.result?.nextPage,
  };
  return result;
};
