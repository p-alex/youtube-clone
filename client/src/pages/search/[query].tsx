import React, { useState, useEffect } from 'react';
import useAxiosWithRetry from '../../hooks/useAxiosWithRetry';
import Layout from '../../layout/Layout';
import router from 'next/router';
import { IVideoSmallWithInfo } from '../../app/features/videoSlice';
import VideoCardWithInfo from '../../components/videoCardWithInfo/VideoCardWithInfo';

const SearchPage = () => {
  const query = router.query.query;
  const [videos, setVideos] = useState<IVideoSmallWithInfo[]>([]);

  const [searchVideos, { isLoading, errors }] = useAxiosWithRetry<
    {},
    { searchResults: IVideoSmallWithInfo[] }
  >(`api/videos/search/${query}`);

  const handleSearchVideos = async () => {
    const response = await searchVideos({});
    if (response.success && response.result) {
      setVideos(response.result.searchResults);
    }
  };

  useEffect(() => {
    handleSearchVideos();
  }, [query]);

  return (
    <Layout>
      {videos.map((video) => {
        return <VideoCardWithInfo key={video.video_id} video={video} />;
      })}
    </Layout>
  );
};

export default SearchPage;
