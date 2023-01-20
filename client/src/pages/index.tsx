import type { NextPage } from 'next';
import Videos from '../components/VideosDisplay/VideosDisplay';
import useAxiosWithRetry from '../hooks/requestHooks/useAxiosWithRetry';
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
    !videos.length && handleGetVideos();
  }, [accessToken]);

  return (
    <Layout
      title={'AlexTube'}
      description={'AlexTube is a video sharing app created by Alexandru Daniel Pistol'}
    >
      {videos.length > 0 && <Videos videos={videos} />}
    </Layout>
  );
};

export default Home;
