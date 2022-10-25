import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../utils/baseURL';

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
  const [errors, setErrors] = useState<Errors | null>(null);
  const request = async (body: Body) => {
    setErrors(null);
    setIsLoading(true);
    try {
      const response = await axios(`${BASE_URL}/${url}`, {
        method: method ? 'GET' : method,
        headers: {
          'Content-Type': 'application/json',
        },
        data: body,
      });

      const data: DefaultResponse<Data | null> = response.data;

      if (!data.success) {
        setErrors(data.errors);
      }

      return data;
    } catch (error: any) {
      const data: DefaultResponse<Data | null> = {
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
