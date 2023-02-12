import React, { useEffect, useState } from 'react';
import {
  ManageAccountPage__Box,
  ManageAccountPage__BoxTitle,
  ManageAccountPage__Button,
  ManageAccountPage__Text,
  ManageAccount__ButtonContainer,
  ManageAccount__ButtonTitle,
} from '../../pageStyles/ManageAccountPage.styles';
import { useRouter } from 'next/router';
import Layout from '../../layout/Layout';
import { BsChevronRight } from 'react-icons/bs';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import useProtectRoute from '../../hooks/useProtectRoute';
import Image from 'next/image';
import Modal from '../../ui/Modal/Modal';
import ManageUsernameForm from '../../components/ManageAccountPageComponents/ManageAccountForms/ManageUsernameForm';
import ManageProfilePictureForm from '../../components/ManageAccountPageComponents/ManageAccountForms/ManageProfilePictureForm';
import ManageProfilePasswordForm from '../../components/ManageAccountPageComponents/ManageAccountForms/ManageProfilePasswordForm';
import PageContainer from '../../containers/PageContainer/PageContainer';

const MANAGE_VIDEOS_CHANGE_LIST = ['Username', 'Profile picture', 'Password'] as const;

const PAGE_TITLE = 'Manage your account';

const ManageAccountPage = () => {
  useProtectRoute();
  const router = useRouter();
  const changeParam = router.query.change as typeof MANAGE_VIDEOS_CHANGE_LIST[number];

  const [lastFocusedElement, setLastFocusedElement] = useState<HTMLButtonElement | null>(
    null
  );

  const auth = useSelector((state: RootState) => state.auth.user);

  const handleAddChangeParam = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    changeParam: typeof MANAGE_VIDEOS_CHANGE_LIST[number]
  ) => {
    const button = event.target as HTMLButtonElement;
    setLastFocusedElement(button);
    router.push(`/manage/account?change=${changeParam}`);
  };

  useEffect(() => {
    if (!changeParam) return;
    const isValidTab = MANAGE_VIDEOS_CHANGE_LIST.includes(changeParam);
    if (!isValidTab) router.push('/manage/account/');
  }, [changeParam]);

  return (
    <Layout head={{ title: PAGE_TITLE }}>
      <PageContainer title={PAGE_TITLE} width={800}>
        {changeParam && (
          <Modal
            title={'Change ' + changeParam}
            width={500}
            handleClose={() => router.push('/manage/account')}
            lastFocusedBtn={lastFocusedElement}
          >
            {changeParam === 'Username' && <ManageUsernameForm />}
            {changeParam === 'Profile picture' && <ManageProfilePictureForm />}
            {changeParam === 'Password' && <ManageProfilePasswordForm />}
          </Modal>
        )}
        <ManageAccountPage__Box>
          <ManageAccountPage__BoxTitle>Basic info</ManageAccountPage__BoxTitle>

          <ManageAccountPage__Button
            onClick={(event) => handleAddChangeParam(event, 'Username')}
          >
            <ManageAccount__ButtonContainer>
              <ManageAccount__ButtonTitle>Username</ManageAccount__ButtonTitle>
              <ManageAccountPage__Text>{auth.username}</ManageAccountPage__Text>
            </ManageAccount__ButtonContainer>
            <BsChevronRight />
          </ManageAccountPage__Button>

          <ManageAccountPage__Button
            onClick={(event) => handleAddChangeParam(event, 'Profile picture')}
          >
            <ManageAccount__ButtonContainer>
              <ManageAccount__ButtonTitle>Profile picture</ManageAccount__ButtonTitle>
              <Image width={80} height={80} src={auth.profile_picture} alt="" />
            </ManageAccount__ButtonContainer>
            <BsChevronRight />
          </ManageAccountPage__Button>
        </ManageAccountPage__Box>

        <ManageAccountPage__Box>
          <ManageAccountPage__BoxTitle>Security</ManageAccountPage__BoxTitle>

          <ManageAccountPage__Button
            onClick={(event) => handleAddChangeParam(event, 'Password')}
          >
            <ManageAccount__ButtonContainer>
              <ManageAccount__ButtonTitle>Password</ManageAccount__ButtonTitle>
              <ManageAccountPage__Text>Change password</ManageAccountPage__Text>
            </ManageAccount__ButtonContainer>
            <BsChevronRight />
          </ManageAccountPage__Button>
        </ManageAccountPage__Box>
      </PageContainer>
    </Layout>
  );
};

export default ManageAccountPage;
