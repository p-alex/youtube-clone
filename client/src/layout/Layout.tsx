import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { RootState } from '../app/store';
import NavBar from '../components/navBar/NavBar';
import { GlobalStyle } from '../styles/global';
ThemeProvider;

const lightTheme = {
  siteBg: '#f8f8f9',
  uiBg: '#fefeff',
  textColor: '#0c161e',
  textMutedColor: '#959495',
  btnBg: '#f9f9f8',
  btnHoverBg: '#e1e0e0',
  borderColor: '#d2d2d2',
  inputBg: '#fefeff',
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
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyle />
      <NavBar />
      {children}
    </ThemeProvider>
  );
};

export default Layout;
