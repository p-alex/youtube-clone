import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { CgProfile } from 'react-icons/cg';
import { MdDarkMode, MdLightMode, MdLogout, MdVideoSettings } from 'react-icons/md';
import {
  ButtonItem,
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
import { ListButton } from '../../ui/ListButton';

export const ProfileDropDown = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { theme } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  const [logoutUser, { isLoading }] = useAxios<{ userId: string }, null>(
    'api/auth/logout',
    'POST'
  );

  const handleLogoutUser = async () => {
    const response = await logoutUser({ userId: user.user_id });
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
              <ListButton>
                <CgProfile /> Your channel
              </ListButton>
            </a>
          </Link>
        </ButtonItem>
        <ButtonItem>
          <Link href={'/manage/videos'}>
            <a>
              <ListButton>
                <MdVideoSettings /> Manage videos
              </ListButton>
            </a>
          </Link>
        </ButtonItem>
        <ButtonItem>
          <ListButton onClick={() => dispatch(toggleTheme())}>
            {theme === 'dark' ? (
              <>
                <MdLightMode /> Light Mode
              </>
            ) : (
              <>
                <MdDarkMode /> Dark Mode
              </>
            )}
          </ListButton>
        </ButtonItem>
        <ButtonItem>
          <ListButton onClick={handleLogoutUser}>
            <MdLogout /> Logout
          </ListButton>
        </ButtonItem>
      </ButtonList>
    </Container>
  );
};
