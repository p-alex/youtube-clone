import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  incrementSubscriptionsUsersPage,
  IChannel,
  loadMoreSubscriptionUsers,
  setSubscriptionUsers,
} from '../../app/features/subscriptionsSlice';
import { RootState } from '../../app/store';
import ChannelCard from '../../components/Cards/ChannelCard/ChannelCard';
import PageContainer from '../../containers/PageContainer/PageContainer';
import useAuth from '../../hooks/authHooks/useAuth';
import useAxiosWithRetry from '../../hooks/requestHooks/useAxiosWithRetry';
import useProtectRoute from '../../hooks/useProtectRoute';
import Layout from '../../layout/Layout';
import { Button } from '../../ui/Button';
import NoResultsMessage from '../../ui/NoResultsMessage';
import Spinner from '../../ui/Spinner';
import styled from 'styled-components';

const PAGE_TITLE = 'Manage Subscriptions';

const SUBSCRIPTION_USERS_LIMIT = 20;

const ManageSubscriptions__Subscriptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-large);
  margin-bottom: var(--space-large);
`;

const ManageSubscriptions = () => {
  useProtectRoute();
  const { isAuth } = useAuth();
  const dispatch = useDispatch();
  const subscriptionUsers = useSelector((state: RootState) => state.subscriptions.users);

  const [showLoadMore, setShowLoadMore] = useState(false);

  const [getSubscriptionUsersRequest, { isLoading, errors }] = useAxiosWithRetry<
    {},
    { users: IChannel[] }
  >('api/subscriptions/users/' + subscriptionUsers.page);

  const handleGetSubscriptionUsers = async () => {
    if (!isAuth) return;
    const response = await getSubscriptionUsersRequest({});
    if (!response.success || !response.result) return;
    dispatch(setSubscriptionUsers({ users: response.result.users }));
    if (response.result.users.length === SUBSCRIPTION_USERS_LIMIT) setShowLoadMore(true);
  };

  const handleLoadMoreSubscriptionUsers = async () => {
    if (!isAuth) return;
    const response = await getSubscriptionUsersRequest({});
    if (!response.success || !response.result) return;
    dispatch(loadMoreSubscriptionUsers({ users: response.result.users }));
    if (response.result.users.length === SUBSCRIPTION_USERS_LIMIT) {
      setShowLoadMore(true);
    } else {
      setShowLoadMore(false);
    }
  };

  useEffect(() => {
    if (subscriptionUsers.list.length !== 0) return;
    handleGetSubscriptionUsers();
  }, [isAuth]);

  useEffect(() => {
    if (subscriptionUsers.page === 0) return;
    handleLoadMoreSubscriptionUsers();
  }, [subscriptionUsers.page]);

  return (
    <Layout head={{ title: PAGE_TITLE }}>
      <PageContainer title={PAGE_TITLE} width={800}>
        {isLoading && <Spinner />}
        {!isLoading && subscriptionUsers.list.length === 0 && (
          <NoResultsMessage message="Nothing to manage" />
        )}
        <ManageSubscriptions__Subscriptions>
          {subscriptionUsers.list.map((user) => {
            return <ChannelCard user={user} />;
          })}
        </ManageSubscriptions__Subscriptions>

        {showLoadMore && (
          <Button
            variant="normal"
            onClick={() => dispatch(incrementSubscriptionsUsersPage())}
            disabled={isLoading}
          >
            Load more
          </Button>
        )}
      </PageContainer>
    </Layout>
  );
};

export default ManageSubscriptions;
