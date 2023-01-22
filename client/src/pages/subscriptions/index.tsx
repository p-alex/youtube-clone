import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IVideoSmall } from '../../app/features/videoSlice';
import { RootState } from '../../app/store';
import useAxiosWithRetry from '../../hooks/requestHooks/useAxiosWithRetry';
import Layout from '../../layout/Layout';
import useProtectRoute from '../../hooks/useProtectRoute';
import {
  incrementSubscriptionsVideosPage,
  loadMoreSubscriptionVideos,
  setSubscriptionVideos,
} from '../../app/features/subscriptionsSlice';
import VideosDisplay from '../../components/VideosDisplay/VideosDisplay';
import { Button } from '../../ui/Button';
import Spinner from '../../ui/Spinner';
import PageContainer from '../../containers/PageContainer/PageContainer';
import Link from 'next/link';

const PAGE_TITLE = 'Subscriptions';

const SUBSCRIPTION_VIDEOS_LIMIT = 20;

const Subscriptions = () => {
  useProtectRoute();
  const user = useSelector((state: RootState) => state.auth.user);
  const subscriptions = useSelector((state: RootState) => state.subscriptions);
  const dispatch = useDispatch();

  const [showLoadMore, setShowLoadMore] = useState(false);

  const [getSubscriptionVideosRequest, { isLoading, errors }] = useAxiosWithRetry<
    {},
    { videos: IVideoSmall[] }
  >('api/subscriptions/videos/' + subscriptions.videos.page);

  const handleGetSubscriptionVideos = async () => {
    const response = await getSubscriptionVideosRequest({});
    if (!response.success || !response.result) return;
    dispatch(setSubscriptionVideos({ videos: response.result?.videos }));
    if (response.result.videos.length === SUBSCRIPTION_VIDEOS_LIMIT)
      setShowLoadMore(true);
  };

  const handleLoadMoreSubscriptionVideos = async () => {
    const response = await getSubscriptionVideosRequest({});
    if (!response.success || !response.result) return;
    dispatch(loadMoreSubscriptionVideos({ videos: response.result?.videos }));
    if (response.result.videos.length === SUBSCRIPTION_VIDEOS_LIMIT) {
      setShowLoadMore(true);
    } else {
      setShowLoadMore(false);
    }
  };

  useEffect(() => {
    if (!user.user_id || subscriptions.videos.list.length > 0) return;
    handleGetSubscriptionVideos();
  }, [user.user_id]);

  useEffect(() => {
    if (subscriptions.videos.page === 0) return;
    handleLoadMoreSubscriptionVideos();
  }, [subscriptions.videos.page]);

  return (
    <Layout head={{ title: PAGE_TITLE, description: '' }}>
      <PageContainer title={PAGE_TITLE}>
        {subscriptions.videos.list.length !== 0 && (
          <>
            <Link href={'/subscriptions/manage'}>
              <Button variant="primary">Manage</Button>
            </Link>
          </>
        )}
        {isLoading && <Spinner />}
        {!isLoading && <VideosDisplay videos={subscriptions.videos.list} />}
        {showLoadMore && (
          <Button
            variant="normal"
            type="button"
            onClick={() => dispatch(incrementSubscriptionsVideosPage())}
            disabled={isLoading}
          >
            Load More
          </Button>
        )}
      </PageContainer>
    </Layout>
  );
};

export default Subscriptions;
