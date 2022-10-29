import React, { useState, useEffect } from 'react';
import Videos from '../../components/videos/Videos';
import useAxiosWithRetry from '../../hooks/useAxiosWithRetry';
import Layout from '../../layout/Layout';
import router from 'next/router';
import { IVideoSmall } from '..';

const SearchPage = () => {
  const query = router.query.query;
  const [videos, setVideos] = useState<IVideoSmall[]>([]);

  const [searchVideos, { isLoading, errors }] = useAxiosWithRetry<
    {},
    { searchResults: IVideoSmall[] }
  >(`api/videos/search/${query}`);

  const handleSearchVideos = async () => {
    const response = await searchVideos({});
    if (response.success && response.result) {
      setVideos(response.result.searchResults);
    }
  };

  useEffect(() => {
    console.log(query);
    handleSearchVideos();
  }, [query]);

  return (
    <Layout>
      <Videos videos={videos} />
    </Layout>
  );
};

export default SearchPage;
