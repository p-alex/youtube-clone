import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../utils/baseURL';

type Errors = {
  message: string;
}[];

export interface DefaultResponse<Data> {
  success: boolean;
  errors: Errors;
  result: Data | null;
}

interface UseAxiosOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;
  accessToken?: string | undefined;
}

const useAxios = <Data>(
  url: string,
  options?: UseAxiosOptions
): [
  () => Promise<DefaultResponse<Data | null>>,
  { isLoading: boolean; errors: Errors | null }
] => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Errors | null>(null);
  const request = async () => {
    try {
      setIsLoading(true);
      const response = await axios(`${BASE_URL}/${url}`, {
        method: !options?.method ? 'GET' : options.method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: options?.accessToken ? `Bearer ${options.accessToken}` : '',
        },
        withCredentials: true,
        data: options?.body,
      });
      const data: DefaultResponse<Data | null> = response.data;
      if (!data.success) {
        setErrors(data.errors);
      }
      return data;
    } catch (error: any) {
      const data: DefaultResponse<null> = {
        success: false,
        errors: [{ message: error.message }],
        result: null,
      };
      return data;
    } finally {
      setIsLoading(false);
    }
  };

  return [request, { isLoading, errors }];
};

export default useAxios;
