import axios from 'axios';
import router from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { BASE_URL } from '../../utils/baseURL';
import useRefreshToken from '../authHooks/useRefreshToken';

export type Errors = {
  message: string;
}[];

export interface DefaultResponse<Data> {
  success: boolean;
  errors: Errors;
  result: Data | null;
}

function useAxiosWithRetry<Body, Data>(
  url: string,
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
): [
  (body: Body) => Promise<DefaultResponse<Data | null>>,
  { isLoading: boolean; errors: Errors | null }
] {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const refreshToken = useRefreshToken();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Errors | null>(null);

  const request = async (accessToken: string, body: Body | undefined) => {
    try {
      setIsLoading(true);

      const response = await axios(`${BASE_URL}/${url}`, {
        method: !method ? 'GET' : method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        data: body,
        withCredentials: true,
      });

      const data: DefaultResponse<Data | null> = response.data;

      if (!data.success) {
        setErrors(data.errors);
      }

      return { statusCode: response.status, data };
    } catch (error: any) {
      const data: DefaultResponse<Data | null> = {
        success: false,
        errors: [{ message: error.response.data.errors[0].message }],
        result: null,
      };
      return { statusCode: error?.response?.status, data };
    } finally {
      setIsLoading(false);
    }
  };

  const retryRequest = async (body: Body | undefined) => {
    const { success, errors, result } = await refreshToken();

    if (success && result) {
      const { data } = await request(result.accessToken, body);
      return data;
    }

    return { success, errors, result } as DefaultResponse<null>;
  };

  const apiRequest = async (body: Body | undefined) => {
    setErrors(null);
    const { statusCode, data } = await request(accessToken, body);

    if (statusCode === 404) {
      router.push('/404');
    }

    if (statusCode === 403) {
      const retryResponse = await retryRequest(body);
      return retryResponse;
    }

    if (statusCode >= 400) {
      setErrors(data.errors);
    }

    return data;
  };

  return [apiRequest, { isLoading, errors }];
}

export default useAxiosWithRetry;
