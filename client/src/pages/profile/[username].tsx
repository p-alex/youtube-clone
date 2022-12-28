import React, { useEffect } from 'react';
import useAxios from '../../hooks/requestHooks/useAxios';
import Layout from '../../layout/Layout';
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
} from '../../pageStyles/ProfilePage.styles';
import ProfileImage from '../../ui/ProfileImage';
import { SubscribeButton } from '../../ui/SubscribeButton';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeProfileTab,
  IProfileBasicInfo,
  setProfileBasicInfo,
} from '../../app/features/profileSlice';
import { RootState } from '../../app/store';
import ProfileVideosTab from '../../components/ProfileTabs/ProfileVideosTab/ProfileVideosTab';
import ProfileAboutTab from '../../components/ProfileTabs/ProfileAboutTab/ProfileAboutTab';

const ProfilePage = () => {
  const router = useRouter();
  const username = router.query.username as string;

  const dispatch = useDispatch();

  const { profileBasicInfo, activeTab } = useSelector(
    (state: RootState) => state.profile
  );

  const [
    getProfileInfo,
    { isLoading: isGetProfileInfoLoading, errors: getProfileInfoErrors },
  ] = useAxios<{}, { profileInfo: IProfileBasicInfo }>(
    'api/users/' + username + '/basic'
  );

  const handleGetProfileInfo = async () => {
    const response = await getProfileInfo({});
    if (!response.success || !response.result) return;
    dispatch(setProfileBasicInfo({ profileInfo: response.result.profileInfo }));
  };

  useEffect(() => {
    if (!username) return;
    handleGetProfileInfo();
  }, [username]);

  return (
    <Layout>
      {isGetProfileInfoLoading && <p>Loading...</p>}
      {!isGetProfileInfoLoading && !profileBasicInfo?.user_id && (
        <p>{getProfileInfoErrors !== null && getProfileInfoErrors[0]?.message}</p>
      )}
      {!isGetProfileInfoLoading && profileBasicInfo?.user_id && (
        <ProfilePage__Container>
          <ProfilePage__Banner bannerColor={'#fe0001'}></ProfilePage__Banner>
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
            <ProfilePage__NavBtn
              isActive={activeTab === 'VIDEOS'}
              onClick={() => dispatch(changeProfileTab({ tab: 'VIDEOS' }))}
            >
              VIDEOS
            </ProfilePage__NavBtn>
            <ProfilePage__NavBtn
              isActive={activeTab === 'ABOUT'}
              onClick={() => dispatch(changeProfileTab({ tab: 'ABOUT' }))}
            >
              ABOUT
            </ProfilePage__NavBtn>
          </ProfilePage__Navigation>
          {activeTab === 'VIDEOS' && <ProfileVideosTab />}
          {activeTab === 'ABOUT' && <ProfileAboutTab />}
        </ProfilePage__Container>
      )}
    </Layout>
  );
};

export default ProfilePage;
