import axios from 'axios';
import { useState } from 'react';
import router from 'next/router';

type Errors = {
  message: string;
}[];

interface DefaultResponse<Data> {
  success: boolean;
  errors: Errors;
  result: Data | null;
}

const useAxios = <Body, Data>(
  url: string,
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
): [
  (body: Body) => Promise<DefaultResponse<Data | null>>,
  { isLoading: boolean; errors: Errors | null }
] => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const request = async (body: Body) => {
    setIsLoading(true);
    setErrors([]);
    try {
      const response = await axios(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/${url}`, {
        method: !method ? 'GET' : method,
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        data: body,
      });

      const data: DefaultResponse<Data | null> = response.data;

      return data;
    } catch (error: any) {
      console.log(error);
      if (error?.request?.status === 404) {
        router.push('/404');
      }
      const data: DefaultResponse<Data | null> = {
        success: false,
        errors: [{ message: error?.response?.data?.errors }],
        result: null,
      };
      setErrors(error?.response?.data?.errors);
      return data;
    } finally {
      setIsLoading(false);
    }
  };

  return [request, { isLoading, errors }];
};

export default useAxios;
