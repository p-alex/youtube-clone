import axios from "axios";
import { DefaultResponse } from "../../hooks/requestHooks/useAxiosWithRetry";

export interface IAuthUser {
  user_id: string;
  email: string;
  username: string;
  profile_picture: string;
}

interface IChannel {
  user_id: string;
  username: string;
  profile_picture: string;
  description: string;
  total_videos: number;
  total_subscribers: number;
}

export const searchChannels = async ({
  searchQuery,
}: {
  searchQuery: string;
}) => {
  const response = await axios.get<DefaultResponse<{ users: IChannel[] }>>(
    process.env.NEXT_PUBLIC_SERVER_BASE_URL! +
      "/api/users/search?query=" +
      searchQuery
  );
  const result = {
    data: response.data.result?.users,
  };
  return result;
};
