import { useSelector } from 'react-redux';
import { IAuthUser } from '../../api/users';
import { RootState } from '../../app/store';

const useAuth = (): { isAuth: boolean; user: IAuthUser | null } => {
  const auth = useSelector((state: RootState) => state.auth);
  return { isAuth: auth.user.user_id !== '', user: auth.user };
};

export default useAuth;
