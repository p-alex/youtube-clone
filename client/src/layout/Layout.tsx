import React from 'react';
import styled from 'styled-components';
import NavBar from '../components/navBar/NavBar';
import { NAV_BAR_HEIGHT } from './style';

const Main = styled.main`
  margin: ${NAV_BAR_HEIGHT + 20}px auto;
  width: 100%;
  max-width: 1850px;
`;

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <Main>{children}</Main>
    </>
  );
};

export default Layout;
