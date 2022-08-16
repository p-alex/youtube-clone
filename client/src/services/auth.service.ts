import { IUser } from '../app/features/authSlice';
import { fetcher } from '../utils/fetcher';

interface LoginUserBody {
  email: string;
  password: string;
}

export const loginUser = async ({ email, password }: LoginUserBody) => {
  try {
    const data = await fetcher<
      LoginUserBody,
      {
        success: boolean;
        errors: { message: string }[];
        user: IUser;
        accessToken: string | null;
      }
    >('/api/auth', 'POST', { email, password });
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const refreshToken = async () => {
  try {
    const data = await fetcher<
      undefined,
      {
        success: boolean;
        errors: { message: string }[];
        user: IUser | null;
        accessToken: string | null;
      }
    >('/api/auth/refresh', 'POST');
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const logoutUser = async ({ user_id }: { user_id: string }) => {
  const data = await fetcher<
    { user_id: string },
    { success: boolean; errors: { message: string }[] }
  >('/api/auth/logout', 'POST', { user_id });
  return data;
};
