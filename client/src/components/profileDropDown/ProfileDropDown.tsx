import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { CgProfile } from 'react-icons/cg';
import { MdDarkMode, MdLightMode, MdLogout, MdVideoSettings } from 'react-icons/md';
import {
  Button,
  ButtonItem,
  ButtonLink,
  ButtonList,
  Container,
  Header,
  NameAndManage,
  ProfilePicture,
  Username,
} from './style';
import { toggleTheme } from '../../app/features/themeSlice';
import { resetUser } from '../../app/features/authSlice';
import router from 'next/router';
import useAxios from '../../hooks/useAxios';
import { motion } from 'framer-motion';

export const ProfileDropDown = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { theme } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  const [logoutUser, { isLoading }] = useAxios<null>('api/auth/logout', {
    method: 'POST',
    body: { user_id: user?.user_id },
  });

  const handleLogoutUser = async () => {
    const response = await logoutUser();
    if (response.success) {
      dispatch(resetUser());
      router.push('/signin');
    }
  };

  return (
    <Container
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'just' }}
      exit={{ opacity: 0 }}
    >
      <Header>
        <ProfilePicture>
          <Image
            src={user ? user.profile_picture : '/images/default-profile-picture.jpg'}
            width={40}
            height={40}
            alt=""
          />
        </ProfilePicture>
        <NameAndManage>
          <Username>{user?.username}</Username>
          <Link href={'#'}>Manage account</Link>
        </NameAndManage>
      </Header>

      <ButtonList>
        <ButtonItem>
          <Link href={'#'}>
            <a>
              <ButtonLink>
                <CgProfile /> Your channel
              </ButtonLink>
            </a>
          </Link>
        </ButtonItem>
        <ButtonItem>
          <Link href={'/manage/videos'}>
            <a>
              <ButtonLink>
                <MdVideoSettings /> Manage videos
              </ButtonLink>
            </a>
          </Link>
        </ButtonItem>
        <ButtonItem>
          <Button onClick={() => dispatch(toggleTheme())}>
            {theme === 'dark' ? (
              <>
                <MdLightMode /> Light Mode
              </>
            ) : (
              <>
                <MdDarkMode /> Dark Mode
              </>
            )}
          </Button>
        </ButtonItem>
        <ButtonItem>
          <Button onClick={handleLogoutUser}>
            <MdLogout /> Logout
          </Button>
        </ButtonItem>
      </ButtonList>
    </Container>
  );
};
