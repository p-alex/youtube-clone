import type { NextPage } from 'next';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Videos from '../components/videos/Videos';
import Layout from '../layout/Layout';

const Home: NextPage = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  return (
    <Layout>
      <Head>
        <title>AlexTube</title>
        <meta
          name="description"
          content="AlexTube is a video sharing app created by Alexandru Daniel Pistol"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {accessToken && <Videos />}
    </Layout>
  );
};

export default Home;
