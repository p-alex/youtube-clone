import React, { useEffect, createContext, useRef } from 'react';
import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefreshToken';
import router from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const RefreshContext = createContext({});

const RefreshContextProvider = ({ children }: { children: React.ReactNode }) => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const effectRan = useRef(false);

  const { isAuth } = useAuth();

  const refreshToken = useRefreshToken();

  const handleRefresh = async () => {
    const response = await refreshToken();
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
