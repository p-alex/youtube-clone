import { fetcher } from '../utils/fetcher';

interface RegisterUserBody {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export const registerUser = async ({
  email,
  username,
  password,
  confirmPassword,
}: RegisterUserBody) => {
  const data = await fetcher<
    RegisterUserBody,
    { success: boolean; errors: { message: string }[] }
  >('/api/users', 'POST', { email, username, password, confirmPassword });
  return data;
};
