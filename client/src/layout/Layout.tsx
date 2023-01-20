import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar/NavBar';
import { MOBILE_BREAK_POINT, NAV_BAR_HEIGHT } from './style';
import { NextSeo } from 'next-seo';

const Main = styled.main`
  margin: ${NAV_BAR_HEIGHT + 20}px auto;
  width: 100%;
  max-width: 1850px;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    margin: ${NAV_BAR_HEIGHT}px auto;
  }
`;

interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
}

const Layout = ({ title, description, children }: Props) => {
  return (
    <>
      {/* <NextSeo title={title + '| AlexTube'} description={description} /> */}
      <Head>
        <title>{title + '| AlexTube'}</title>
        <meta name="description" content={description} key="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      ;
      <NavBar />
      <Main>{children}</Main>
    </>
  );
};

export default Layout;
