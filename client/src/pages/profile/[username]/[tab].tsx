import React, { useEffect } from 'react';
import useAxios from '../../../hooks/requestHooks/useAxios';
import Layout from '../../../layout/Layout';
import {
  ProfilePage__Banner,
  ProfilePage__Container,
  ProfilePage__Header,
  ProfilePage__NavBtn,
  ProfilePage__Navigation,
  ProfilePage__SmallText,
  ProfilePage__UserInfo,
  ProfilePage__UserInfoContainer,
  ProfilePage__Username,
} from '../../../pageStyles/ProfilePage.styles';
import ProfileImage from '../../../ui/ProfileImage';
import { SubscribeButton } from '../../../ui/SubscribeButton';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  IProfileBasicInfo,
  setProfileActiveTab,
  setProfileBasicInfo,
  setProfileVideos,
} from '../../../app/features/profileSlice';
import { RootState } from '../../../app/store';
import ProfileVideosTab from '../../../components/ProfileTabs/ProfileVideosTab/ProfileVideosTab';
import ProfileAboutTab from '../../../components/ProfileTabs/ProfileAboutTab/ProfileAboutTab';
import Link from 'next/link';
import { IVideoSmall } from '../../../app/features/videoSlice';
import Head from 'next/head';

const ProfilePage = () => {
  const router = useRouter();
  const userId = useSelector(
    (state: RootState) => state.profile.profileBasicInfo?.user_id
  );

  const activeTab = useSelector((state: RootState) => state.profile.activeTab);
  const { sortBy, videos, page } = useSelector(
    (state: RootState) => state.profile.videosTab
  );

  const currentTab = router.query.tab;
  const username = router.query.username as string;

  const dispatch = useDispatch();

  const { profileBasicInfo, tabs } = useSelector((state: RootState) => state.profile);
  const channelDesc = useSelector(
    (state: RootState) => state.profile.profileBasicInfo?.description
  );

  const [
    getProfileInfo,
    { isLoading: isGetProfileInfoLoading, errors: getProfileInfoErrors },
  ] = useAxios<{}, { profileInfo: IProfileBasicInfo }>(
    'api/users/' + username + '/basic'
  );

  const [
    getProfileVideosRequest,
    { isLoading: isGetProfileVideosLoading, errors: getProfileVideosErrors },
  ] = useAxios<{}, { videos: IVideoSmall[] }>(
    'api/videos/user/' + userId + '/' + sortBy + '/' + page
  );

  const handleGetProfileInfo = async () => {
    const response = await getProfileInfo({});
    if (!response.success || !response.result) return;
    dispatch(setProfileBasicInfo({ profileInfo: response.result.profileInfo }));
  };

  const handleGetProfileVideos = async () => {
    const response = await getProfileVideosRequest({});
    if (!response.success || !response.result) return;
    dispatch(setProfileVideos({ videos: response.result.videos }));
  };

  useEffect(() => {
    if (!username) return;
    handleGetProfileInfo();
  }, [username]);

  useEffect(() => {
    dispatch(setProfileActiveTab({ tab: currentTab as string }));
  }, [currentTab]);

  useEffect(() => {
    if (!userId || currentTab !== 'videos') return;
    handleGetProfileVideos();
  }, [userId, activeTab]);

  useEffect(() => {
    if (videos.length === 0) return;
    handleGetProfileVideos();
  }, [sortBy]);

  return (
    <Layout>
      <Head>
        <title>
          {username ? username + `'s channel ${activeTab && `| ${activeTab}`}` : ''}
        </title>
        <meta name="description" content={channelDesc} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isGetProfileInfoLoading && <p>Loading...</p>}
      {!isGetProfileInfoLoading && !profileBasicInfo?.user_id && (
        <p>{getProfileInfoErrors !== null && getProfileInfoErrors[0]?.message}</p>
      )}
      {!isGetProfileInfoLoading && profileBasicInfo?.user_id && (
        <ProfilePage__Container>
          <ProfilePage__Banner bannerColor={'#222'}></ProfilePage__Banner>
          <ProfilePage__Header>
            <ProfilePage__UserInfoContainer>
              <ProfileImage
                imageUrl={profileBasicInfo.profile_picture}
                width={85}
                height={85}
                username={profileBasicInfo.username}
              ></ProfileImage>
              <ProfilePage__UserInfo>
                <ProfilePage__Username>{profileBasicInfo.username}</ProfilePage__Username>
                <ProfilePage__SmallText>
                  {profileBasicInfo.total_subscribers}{' '}
                  {profileBasicInfo.total_subscribers === 1
                    ? 'subscriber'
                    : 'subscribers'}
                </ProfilePage__SmallText>
              </ProfilePage__UserInfo>
            </ProfilePage__UserInfoContainer>
            <SubscribeButton variant="normal">Subscribe</SubscribeButton>
          </ProfilePage__Header>
          <ProfilePage__Navigation>
            <Link href={`/profile/${profileBasicInfo.username}/videos`}>
              <a>
                <ProfilePage__NavBtn isActive={currentTab === 'videos'}>
                  VIDEOS
                </ProfilePage__NavBtn>
              </a>
            </Link>
            <Link href={`/profile/${profileBasicInfo.username}/about`}>
              <a>
                <ProfilePage__NavBtn isActive={currentTab === 'about'}>
                  ABOUT
                </ProfilePage__NavBtn>
              </a>
            </Link>
          </ProfilePage__Navigation>
          {currentTab === 'videos' && videos.length > 0 && profileBasicInfo && (
            <ProfileVideosTab
              getProfileVideosRequest={getProfileVideosRequest}
              isGetProfileVideosLoading={isGetProfileVideosLoading}
            />
          )}
          {currentTab === 'about' && profileBasicInfo && <ProfileAboutTab />}
        </ProfilePage__Container>
      )}
    </Layout>
  );
};

export default ProfilePage;
