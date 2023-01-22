import React from 'react';
import PageContainer from '../../containers/PageContainer/PageContainer';
import Layout from '../../layout/Layout';

const PAGE_TITLE = 'Manage Your Subscriptions';

const ManageSubscriptions = () => {
  return (
    <Layout head={{ title: PAGE_TITLE, description: '' }}>
      <PageContainer title={PAGE_TITLE}>hello</PageContainer>
    </Layout>
  );
};

export default ManageSubscriptions;
