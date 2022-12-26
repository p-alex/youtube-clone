import { useSelector } from 'react-redux';
import { IUser } from '../../app/features/authSlice';
import { RootState } from '../../app/store';

const useAuth = (): { isAuth: boolean; user: IUser | null } => {
  const auth = useSelector((state: RootState) => state.auth);
  return { isAuth: auth.user.user_id !== '', user: auth.user };
};

export default useAuth;
