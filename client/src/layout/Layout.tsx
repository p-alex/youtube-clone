import React from 'react';
import { useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { RootState } from '../app/store';
import NavBar from '../components/navBar/NavBar';
import { GlobalStyle } from '../styles/global';
import { NAV_BAR_HEIGHT } from './style';

const lightTheme = {
  siteBg: '#FFFFFF',
  uiBg: '#FFFFFF',
  uiSecondaryBg: '#F2F2F2',
  textColor: '#0c161e',
  textMutedColor: '#959495',
  borderColor: '#d2d2d2',
  inputBg: '#fefeff',
  hrColor: 'silver',
  accentColor: '#3ea6ff',
  errorColor: '#ff3434',
  primaryBtn: {
    bg: '#3ea6ff',
    bgHover: '#5db4ff',
    textColor: '#111',
  },
  normalBtn: {
    bg: '#d9d9d9',
    bgHover: '#c7c7c7',
    textColor: '#0c161e',
  },
  dangerBtn: {
    bg: '#fe0001',
    bgHover: '#ff3434',
    textColor: '#fffeff',
  },
  listButton: {
    bgHover: '#e1e0e0',
  },
  subscribeBtn: {
    bg: '#0F0F0F',
    bgHover: '#232323',
    textColor: '#fffeff',
    subedBg: '#F2F2F2',
    subedBgHover: '#dddddd',
    subedTextColor: '#0F0F0F',
  },
};

const darkTheme = {
  siteBg: '#0F0F0F',
  uiBg: '#0F0F0F',
  uiSecondaryBg: '#272727',
  textColor: '#fffeff',
  textMutedColor: '#8a8a8a',
  borderColor: '#343534',
  inputBg: '#121213',
  hrColor: '#333',
  accentColor: '#3ea6ff',
  errorColor: '#ff3434',
  primaryBtn: {
    bg: '#3ea6ff',
    bgHover: '#5db4ff',
    textColor: '#111',
  },
  normalBtn: {
    bg: ' #222222',
    bgHover: '#3b3a3b',
    textColor: '#fffeff',
  },
  dangerBtn: {
    bg: '#fe0001',
    bgHover: '#ff3434',
    textColor: '#fffeff',
  },
  listButton: {
    bgHover: '#3b3a3b',
  },
  subscribeBtn: {
    bg: '#F1F1F1',
    bgHover: '#dedede',
    textColor: '#0F0F0F',
    subedBg: '#272727',
    subedBgHover: '#414141',
    subedTextColor: '#F1F1F1',
  },
};

const Main = styled.main`
  margin: ${NAV_BAR_HEIGHT + 20}px auto;
  width: 100%;
  max-width: 1850px;
`;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyle />
      <NavBar />
      <Main>{children}</Main>
    </ThemeProvider>
  );
};

export default Layout;
