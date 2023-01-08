import { useEffect } from 'react';
import useAuth from './authHooks/useAuth';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const useProtectRoute = () => {
  const router = useRouter();
  const { isAuth } = useAuth();
  const isGettingUser = useSelector((state: RootState) => state.auth.isGettingUser);
  useEffect(() => {
    if (!isAuth && !isGettingUser) router.push('/signin');
  }, [isAuth, isGettingUser]);
  return null;
};

export default useProtectRoute;
