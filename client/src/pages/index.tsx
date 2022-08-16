import type { NextPage } from 'next';
import Head from 'next/head';
import Videos from '../components/videos/Videos';
import Layout from '../layout/Layout';

const Home: NextPage = () => {
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
      <Videos />
    </Layout>
  );
};

export default Home;
