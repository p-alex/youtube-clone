import React, { useEffect } from 'react';
import useAxios from '../../../hooks/requestHooks/useAxios';
import Layout from '../../../layout/Layout';
import {
  ProfilePage__Header,
  ProfilePage__NavBtn,
  ProfilePage__Navigation,
  ProfilePage__SmallText,
  ProfilePage__UserInfo,
  ProfilePage__UserInfoContainer,
  ProfilePage__Username,
} from '../../../pageStyles/ProfilePage.styles';
import ProfileImage from '../../../ui/ProfileImage';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  IProfileInfo,
  setProfileActiveTab,
  setProfileInfo,
  setProfileVideos,
} from '../../../app/features/profileSlice';
import { RootState } from '../../../app/store';
import ProfileVideosTab from '../../../components/ProfileTabs/ProfileVideosTab/ProfileVideosTab';
import ProfileAboutTab from '../../../components/ProfileTabs/ProfileAboutTab/ProfileAboutTab';
import Link from 'next/link';
import { IVideoSmall } from '../../../app/features/videoSlice';
import SubscribeButton from '../../../ui/SubscribeButton';
import PageContainer from '../../../containers/PageContainer/PageContainer';

const ProfilePage = () => {
  const router = useRouter();

  const currentUserId = useSelector((state: RootState) => state.auth.user.user_id);
  const currentUsername = useSelector((state: RootState) => state.auth.user.username);
  const profileUserId = useSelector(
    (state: RootState) => state.profile.profileInfo?.user_id
  );

  const { sortBy, videos, page } = useSelector(
    (state: RootState) => state.profile.videosTab
  );

  const currentTab = router.query.tab;
  const username = router.query.username as string;

  const dispatch = useDispatch();

  const { profileInfo } = useSelector((state: RootState) => state.profile);

  const [
    getProfileInfo,
    { isLoading: isGetProfileInfoLoading, errors: getProfileInfoErrors },
  ] = useAxios<{ currentUserId: string | undefined }, { profileInfo: IProfileInfo }>(
    'api/users/' + username + '/profile',
    'POST'
  );

  const [
    getProfileVideosRequest,
    { isLoading: isGetProfileVideosLoading, errors: getProfileVideosErrors },
  ] = useAxios<{}, { videos: IVideoSmall[] }>(
    'api/videos/user/' + profileUserId + '/' + sortBy + '/' + page
  );

  const handleGetProfileInfo = async () => {
    const response = await getProfileInfo({ currentUserId });
    if (!response.success || !response.result) return;
    dispatch(setProfileInfo({ profileInfo: response.result.profileInfo }));
  };

  const handleGetProfileVideos = async () => {
    const response = await getProfileVideosRequest({});
    if (!response.success || !response.result) return;
    dispatch(setProfileVideos({ videos: response.result.videos }));
  };

  useEffect(() => {
    if (!username || username === profileInfo?.username) return;
    handleGetProfileInfo();
  }, [username, currentUserId]);

  useEffect(() => {
    dispatch(setProfileActiveTab({ tab: currentTab as string }));
  }, [currentTab]);

  useEffect(() => {
    if (!profileUserId || currentTab !== 'videos') return;
    handleGetProfileVideos();
  }, [profileUserId]);

  useEffect(() => {
    if (!username) return;
    handleGetProfileVideos();
  }, [sortBy]);

  return (
    <Layout
      head={{
        title: profileInfo?.username ? profileInfo.username : 'Loading channel',
        description: profileInfo?.description ? profileInfo.description : '',
      }}
    >
      <PageContainer width={1250}>
        {isGetProfileInfoLoading && <p>Loading...</p>}
        {!isGetProfileInfoLoading && !profileInfo?.user_id && (
          <p>{getProfileInfoErrors !== null && getProfileInfoErrors[0]?.message}</p>
        )}
        {!isGetProfileInfoLoading && profileInfo?.user_id && (
          <>
            <ProfilePage__Header>
              <ProfilePage__UserInfoContainer>
                <ProfileImage
                  imageUrl={profileInfo.profile_picture}
                  width={85}
                  height={85}
                  username={profileInfo.username}
                ></ProfileImage>
                <ProfilePage__UserInfo>
                  <ProfilePage__Username>{profileInfo.username}</ProfilePage__Username>
                  <ProfilePage__SmallText>
                    {profileInfo.total_subscribers}{' '}
                    {profileInfo.total_subscribers === 1 ? 'subscriber' : 'subscribers'}
                  </ProfilePage__SmallText>
                </ProfilePage__UserInfo>
              </ProfilePage__UserInfoContainer>
              {profileInfo.username !== currentUsername && (
                <SubscribeButton
                  isSubscribed={profileInfo.subscribe_status}
                  subscribeToUserId={profileInfo.user_id}
                  subscribeToUsername={profileInfo.username}
                  changeStateIn={'profile'}
                  withConfirmation
                />
              )}
            </ProfilePage__Header>
            <ProfilePage__Navigation>
              <Link href={`/profile/${profileInfo.username}/videos`}>
                <a>
                  <ProfilePage__NavBtn isActive={currentTab === 'videos'}>
                    VIDEOS
                  </ProfilePage__NavBtn>
                </a>
              </Link>
              <Link href={`/profile/${profileInfo.username}/about`}>
                <a>
                  <ProfilePage__NavBtn isActive={currentTab === 'about'}>
                    ABOUT
                  </ProfilePage__NavBtn>
                </a>
              </Link>
            </ProfilePage__Navigation>
            {currentTab === 'videos' && videos.length > 0 && profileInfo && (
              <ProfileVideosTab
                getProfileVideosRequest={getProfileVideosRequest}
                isGetProfileVideosLoading={isGetProfileVideosLoading}
              />
            )}
            {currentTab === 'about' && profileInfo && <ProfileAboutTab />}
          </>
        )}
      </PageContainer>
    </Layout>
  );
};

export default ProfilePage;
