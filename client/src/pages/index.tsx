import type { NextPage } from 'next';
import Head from 'next/head';
import Videos from '../components/videos/Videos';
import useAxiosWithRetry from '../hooks/useAxiosWithRetry';
import Layout from '../layout/Layout';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { IVideoSmall } from '../app/features/videoSlice';

const Home: NextPage = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [videos, setVideos] = useState<IVideoSmall[]>([]);

  const [getVideos, { isLoading, errors }] = useAxiosWithRetry<
    {},
    { videos: IVideoSmall[] }
  >('api/videos');

  const handleGetVideos = async () => {
    const response = await getVideos({});
    if (response.success && response.result) {
      setVideos(response.result.videos);
    }
  };

  useEffect(() => {
    console.log(window.navigator);
    !videos.length && handleGetVideos();
  }, [accessToken]);

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
      {videos.length > 0 && <Videos videos={videos} />}
    </Layout>
  );
};

export default Home;
