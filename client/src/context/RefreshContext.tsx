import React, { useEffect, createContext, useRef } from 'react';
import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefreshToken';
import router from 'next/router';

const RefreshContext = createContext({});

const RefreshContextProvider = ({ children }: { children: React.ReactNode }) => {
  const effectRan = useRef(false);

  const { isAuth } = useAuth();

  const refreshToken = useRefreshToken();

  const handleRefresh = async () => {
    const response = await refreshToken();
    if (!response.success) return router.push('/signin');
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
