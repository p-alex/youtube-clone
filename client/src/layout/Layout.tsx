import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { RootState } from '../app/store';
import NavBar from '../components/navBar/NavBar';
import useAuth from '../hooks/useAuth';
import { GlobalStyle } from '../styles/global';

const lightTheme = {
  siteBg: '#efefef',
  uiBg: '#ffffff',
  textColor: '#0c161e',
  textMutedColor: '#959495',
  btnBg: '#f9f9f8',
  btnHoverBg: '#e1e0e0',
  borderColor: '#d2d2d2',
  inputBg: '#fefeff',
  hrColor: 'silver',
  accentColor: '#3ea6ff',
  subscribeBtn: {
    subBg: '#fe0001',
    subTextColor: '#fff',
    unsubBg: '#313131',
    unsubTextColor: '#a1aba7',
  },
};

const darkTheme = {
  siteBg: '#181919',
  uiBg: '#202020',
  textColor: '#fffeff',
  textMutedColor: '#8a8a8a',
  btnBg: '#313031',
  btnHoverBg: '#3b3a3b',
  borderColor: '#343534',
  inputBg: '#121213',
  hrColor: '#333',
  accentColor: '#3ea6ff',
  subscribeBtn: {
    subBg: '#fe0001',
    subTextColor: '#fff',
    unsubBg: '#313131',
    unsubTextColor: '#a1aba7',
  },
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const { isAuth } = useAuth();
  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyle />
      {isAuth && <NavBar />}
      {children}
    </ThemeProvider>
  );
};

export default Layout;
