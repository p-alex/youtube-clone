import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar/NavBar';
import { MOBILE_BREAK_POINT, NAV_BAR_HEIGHT } from './style';

const Main = styled.main`
  position: relative;
  margin: ${NAV_BAR_HEIGHT + 20}px auto;
  width: 100%;
  max-width: 1850px;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    margin: ${NAV_BAR_HEIGHT}px auto;
  }
`;

interface Props {
  head: {
    title: string;
    description?: string;
  };
  children: React.ReactNode;
}

const Layout = ({ head, children }: Props) => {
  return (
    <>
      <Head>
        <title key={'title'}>
          {head?.title
            ? head.title + ' | AlexTube by Pistol Alexandru Daniel'
            : 'AlexTube by Pistol Alexandru Daniel'}
        </title>
        <meta
          name="description"
          content={
            head?.description
              ? head.description
              : 'AlexTube is a video sharing app created by Pistol Alexandru Daniel'
          }
          key="description"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Main id="main">{children}</Main>
    </>
  );
};

export default Layout;
