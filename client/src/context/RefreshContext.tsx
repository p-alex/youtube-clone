import React, { useEffect, useState, createContext, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../app/features/authSlice';
import useAuth from '../hooks/useAuth';
import { refreshToken } from '../services/auth.service';

const RefreshContext = createContext({});

const RefreshContextProvider = ({ children }: { children: React.ReactNode }) => {
  const effectRan = useRef(false);

  const { isAuth } = useAuth();
  const dispatch = useDispatch();

  const handleTryRefresh = async () => {
    const response = await refreshToken();
    console.log(response);
    if (!response?.success) return;
    console.log('response', response);
    dispatch(setUser({ user: response.user!, accessToken: response.accessToken! }));
  };

  useEffect(() => {
    // Try to refresh token if rtoken cookie exists
    if (effectRan.current === false) {
      if (!isAuth) {
        handleTryRefresh();
      }
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  return <RefreshContext.Provider value={{}}>{children}</RefreshContext.Provider>;
};

export { RefreshContext, RefreshContextProvider };
