import React from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar/NavBar';
import { MOBILE_BREAK_POINT, NAV_BAR_HEIGHT } from './style';

const Main = styled.main`
  margin: ${NAV_BAR_HEIGHT + 20}px auto;
  width: 100%;
  max-width: 1850px;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    margin: ${NAV_BAR_HEIGHT}px auto;
  }
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
