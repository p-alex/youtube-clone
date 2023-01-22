import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { CgProfile } from 'react-icons/cg';
import { MdDarkMode, MdLightMode, MdLogout, MdVideoSettings } from 'react-icons/md';
import {
  ProfileDropDown__ButtonItem,
  ProfileDropDown__ButtonList,
  ProfileDropDown__Container,
  ProfileDropDown__Header,
  ProfileDropDown__NameAndManage,
  ProfileDropDown__ProfilePicture,
  ProfileDropDown__Username,
} from './ProfileDropDown.styles';
import { toggleTheme } from '../../app/features/themeSlice';
import { resetUser } from '../../app/features/authSlice';
import router from 'next/router';
import useAxios from '../../hooks/requestHooks/useAxios';
import { motion } from 'framer-motion';
import { ListButton } from '../../ui/ListButton';
import { resetManageVideos } from '../../app/features/manageVideo';
import { resetProfile } from '../../app/features/profileSlice';
import { resetSubscriptions } from '../../app/features/subscriptionsSlice';
import { resetSuggestions } from '../../app/features/suggestionsSlice';
import { resetVideoState } from '../../app/features/videoSlice';

export const ProfileDropDown = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { theme } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  const [logoutUser, { isLoading }] = useAxios<{ userId: string }, null>(
    'api/auth/logout',
    'POST'
  );

  const handleResetReducers = () => {
    dispatch(resetUser());
    dispatch(resetManageVideos());
    dispatch(resetProfile());
    dispatch(resetSubscriptions());
    dispatch(resetSuggestions());
    dispatch(resetVideoState());
  };

  const handleLogoutUser = async () => {
    const response = await logoutUser({ userId: user.user_id });
    if (response.success) {
      router.push('/signin');
      handleResetReducers();
    }
  };

  return (
    <ProfileDropDown__Container
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'just' }}
      exit={{ opacity: 0 }}
    >
      <ProfileDropDown__Header>
        <ProfileDropDown__ProfilePicture>
          <Image
            src={user ? user.profile_picture : '/images/default-profile-picture.jpg'}
            width={40}
            height={40}
            alt=""
          />
        </ProfileDropDown__ProfilePicture>
        <ProfileDropDown__NameAndManage>
          <ProfileDropDown__Username>{user?.username}</ProfileDropDown__Username>
          <Link href={'/manage/account'}>Manage account</Link>
        </ProfileDropDown__NameAndManage>
      </ProfileDropDown__Header>
      <ProfileDropDown__ButtonList>
        <ProfileDropDown__ButtonItem>
          <Link href={`/profile/${user.username}/videos`}>
            <ListButton>
              <CgProfile /> Your channel
            </ListButton>
          </Link>
        </ProfileDropDown__ButtonItem>
        <ProfileDropDown__ButtonItem>
          <Link href={'/manage/videos'}>
            <ListButton>
              <MdVideoSettings /> Manage videos
            </ListButton>
          </Link>
        </ProfileDropDown__ButtonItem>
        <ProfileDropDown__ButtonItem>
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
        </ProfileDropDown__ButtonItem>
        <ProfileDropDown__ButtonItem>
          <ListButton onClick={handleLogoutUser}>
            <MdLogout /> Logout
          </ListButton>
        </ProfileDropDown__ButtonItem>
      </ProfileDropDown__ButtonList>
    </ProfileDropDown__Container>
  );
};
