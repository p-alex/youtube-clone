import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { IAuthUser } from '../../api/users';
import { setUser } from '../../app/features/authSlice';
import { DefaultResponse } from '../requestHooks/useAxiosWithRetry';

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refreshToken = async (): Promise<
    DefaultResponse<{
      user: IAuthUser;
      accessToken: string;
    } | null>
  > => {
    const response = axios
      .get<
        DefaultResponse<{
          user: IAuthUser;
          accessToken: string;
        }>
      >(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/auth/refresh`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((res) => {
        dispatch(
          setUser({ user: res.result!.user, accessToken: res.result!.accessToken })
        );
        return res;
      })
      .catch((error) => {
        const err = error as AxiosError<DefaultResponse<null>>;
        const errors = err.response!.data;
        return errors;
      });

    return response;
  };

  return refreshToken;
};

export default useRefreshToken;
