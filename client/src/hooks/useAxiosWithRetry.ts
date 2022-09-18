import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/baseURL";
import useRefreshToken from "./useRefreshToken";

type Errors = {
  message: string;
}[];

export interface DefaultResponse<Data> {
  success: boolean;
  errors: Errors;
  result: Data | null;
}

interface UseAxiosOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
  accessToken: string;
}

const useAxiosWithRetry = <Data>(
  url: string,
  options: UseAxiosOptions
): [
  () => Promise<DefaultResponse<Data | null>>,
  { isLoading: boolean; errors: Errors | null }
] => {
  const refreshToken = useRefreshToken();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Errors | null>(null);

  const request = async (accessToken: string) => {
    try {
      setIsLoading(true);

      const response = await axios(`${BASE_URL}/${url}`, {
        method: !options?.method ? "GET" : options.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        data: options?.body,
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
        errors: [{ message: error.message }],
        result: null,
      };

      return { statusCode: error.response.status, data };
    } finally {
      setIsLoading(false);
    }
  };

  const retryRequest = async () => {
    const { success, errors, result } = await refreshToken();

    if (success && result) {
      const response = await request(result.accessToken);
      return response.data;
    }

    return { success, errors, result } as DefaultResponse<null>;
  };

  const apiRequest = async () => {
    if (!options.accessToken)
      return {
        success: false,
        errors: [{ message: "No access token" }],
        result: null,
      } as DefaultResponse<null>;

    const response = await request(options.accessToken);

    console.log(response);

    if (response.statusCode === 403) {
      const retryResponse = await retryRequest();
      return retryResponse;
    }

    return response.data;
  };

  return [apiRequest, { isLoading, errors }];
};

export default useAxiosWithRetry;
