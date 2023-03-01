import axios from 'axios';
import { IVideoSmallWithInfoRanked } from '../../app/features/videoSlice';
import { DefaultResponse } from '../../hooks/requestHooks/useAxiosWithRetry';

export const searchVideos = async ({
  searchQuery,
  cursor,
}: {
  searchQuery: string;
  cursor: number;
}) => {
  const response = await axios.get<
    DefaultResponse<{ searchResults: IVideoSmallWithInfoRanked[]; nextCursor: number }>
  >(
    process.env.NEXT_PUBLIC_SERVER_BASE_URL! +
      '/api/videos/search?query=' +
      searchQuery +
      '&cursor=' +
      cursor
  );
  const result = {
    data: response.data.result?.searchResults,
    nextCursor: response.data.result?.nextCursor,
  };
  return result;
};
