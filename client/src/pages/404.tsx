import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import Layout from '../layout/Layout';

const NotFound__Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  margin: auto;
  & img {
    width: 200px;
  }
`;

const NotFount__Text = styled.div`
  color: ${(props) => props.theme.textColor};
`;

const NotFountPage = () => {
  return (
    <Layout title={'Page not found'} description={''}>
      <Head>
        <title>404 Not Found</title>
        <meta name="description" content="Page not available" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NotFound__Container>
        <Image src="/svg/404-not-found.svg" width="200" height="132.80" alt="" />
        <NotFount__Text>This page is not available</NotFount__Text>
      </NotFound__Container>
    </Layout>
  );
};

export default NotFountPage;
