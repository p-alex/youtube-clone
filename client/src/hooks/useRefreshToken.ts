import axios from 'axios';
import { useDispatch } from 'react-redux';
import { IUser, setUser } from '../app/features/authSlice';
import { BASE_URL } from '../utils/baseURL';
import { DefaultResponse } from './useAxios';

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refreshToken = async (): Promise<
    DefaultResponse<{ user: IUser; accessToken: string } | null>
  > => {
    try {
      const response = await axios.get(`${BASE_URL}/api/auth/refresh`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      const data: DefaultResponse<{ user: IUser; accessToken: string }> = response.data;
      if (data.success && data.result) {
        dispatch(
          setUser({ user: data.result.user, accessToken: data.result.accessToken })
        );
        return data;
      }
    } catch (error: any) {
      return {
        success: false,
        errors: [{ message: error.message }],
        result: null,
      };
    }
    return {
      success: false,
      errors: [{ message: 'Something went wrong...' }],
      result: null,
    };
  };

  return refreshToken;
};

export default useRefreshToken;
