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
  resetProfile,
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
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { DefaultResponse } from '../../../hooks/requestHooks/useAxiosWithRetry';
import { ErrorText } from '../../../ui/Text';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.params?.userId as string;
  try {
    const res = await axios.get<
      undefined,
      { data: DefaultResponse<{ profileInfo: IProfileInfo }> }
    >(process.env.NEXT_PUBLIC_SERVER_BASE_URL + '/api/users/' + userId + '/profile');
    const profileInfo = res.data.result?.profileInfo;
    if (!profileInfo) throw new Error(res.data.errors[0].message);
    return {
      props: { profileInfo, pageError: null },
    };
  } catch (error: any) {
    return {
      props: {
        profileInfo: null,
        pageError: { message: error.response.data?.errors[0].message },
      },
    };
  }
};

const ProfilePage = ({
  profileInfo,
  pageError,
}: {
  profileInfo: IProfileInfo;
  pageError: { message: string };
}) => {
  const router = useRouter();

  const currentUsername = useSelector((state: RootState) => state.auth.user.username);
  const profileUserId = useSelector(
    (state: RootState) => state.profile.profileInfo?.user_id
  );

  const { sortBy, videos, page } = useSelector(
    (state: RootState) => state.profile.videosTab
  );

  const currentTab = router.query.tab;

  const dispatch = useDispatch();

  const [
    getProfileVideosRequest,
    { isLoading: isGetProfileVideosLoading, errors: getProfileVideosErrors },
  ] = useAxios<{}, { videos: IVideoSmall[] }>(
    'api/videos/user/' + profileUserId + '/' + sortBy + '/' + page
  );

  useEffect(() => {
    dispatch(setProfileInfo({ profileInfo }));
  }, []);

  const handleGetProfileVideos = async () => {
    const response = await getProfileVideosRequest({});
    if (!response.success || !response.result) return;
    dispatch(setProfileVideos({ videos: response.result.videos }));
  };

  useEffect(() => {
    dispatch(setProfileActiveTab({ tab: currentTab as string }));
  }, [currentTab]);

  useEffect(() => {
    if (!profileUserId || currentTab !== 'videos') return;
    handleGetProfileVideos();
  }, [profileUserId]);

  useEffect(() => {
    if (!profileUserId) return;
    handleGetProfileVideos();
  }, [sortBy]);

  useEffect(() => {
    return () => {
      dispatch(resetProfile());
    };
  }, []);

  return (
    <Layout
      head={{
        title: profileInfo?.username ? profileInfo.username : 'Loading channel',
        description: profileInfo?.description ? profileInfo.description : '',
      }}
    >
      <PageContainer width={1250}>
        {pageError?.message && <ErrorText>{pageError.message}</ErrorText>}
        {!pageError?.message && profileInfo?.user_id && (
          <>
            <ProfilePage__Header>
              <ProfilePage__UserInfoContainer>
                <ProfileImage
                  imageUrl={profileInfo.profile_picture}
                  width={85}
                  height={85}
                  userId={profileInfo.user_id}
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
                  subscribeToUserId={profileInfo.user_id}
                  subscribeToUsername={profileInfo.username}
                  changeStateIn={'profile'}
                  withConfirmation
                />
              )}
            </ProfilePage__Header>
            <ProfilePage__Navigation>
              <Link href={`/profile/${profileInfo.user_id}/videos`}>
                <a>
                  <ProfilePage__NavBtn isActive={currentTab === 'videos'}>
                    VIDEOS
                  </ProfilePage__NavBtn>
                </a>
              </Link>
              <Link href={`/profile/${profileInfo.user_id}/about`}>
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
