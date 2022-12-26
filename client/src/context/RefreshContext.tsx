import React, { useEffect, createContext, useRef } from 'react';
import useAuth from '../hooks/authHooks/useAuth';
import useRefreshToken from '../hooks/authHooks/useRefreshToken';
import router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setIsGettingUser } from '../app/features/authSlice';

const RefreshContext = createContext({});

const RefreshContextProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const effectRan = useRef(false);

  const { isAuth } = useAuth();

  const refreshToken = useRefreshToken();

  const handleRefresh = async () => {
    dispatch(setIsGettingUser(true));
    const response = await refreshToken();
    dispatch(setIsGettingUser(false));
    if (response.errors[0]?.message === 'Invalid token') return router.push('/signin');
  };

  useEffect(() => {
    // Try to refresh token if rtoken cookie exists
    if (effectRan.current === false) {
      if (!isAuth) {
        handleRefresh();
      }
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  return <RefreshContext.Provider value={{}}>{children}</RefreshContext.Provider>;
};

export { RefreshContext, RefreshContextProvider };
