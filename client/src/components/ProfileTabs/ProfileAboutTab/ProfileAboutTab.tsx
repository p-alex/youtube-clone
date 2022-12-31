import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IProfileAbout, setProfileAbout } from '../../../app/features/profileSlice';
import { RootState } from '../../../app/store';
import useAxios from '../../../hooks/requestHooks/useAxios';
import {
  ProfileAboutTab__Box,
  ProfileAboutTab__Container,
  ProfileAboutTab__Description,
  ProfileAboutTab__Item,
  ProfileAboutTab__List,
  ProfileAboutTab__Text,
  ProfileAboutTab__Title,
} from './ProfileAboutTab.styles';

const ProfileAboutTab = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const username = router.query.username as string;

  const channelDesc = useSelector(
    (state: RootState) => state.profile.profileBasicInfo?.description
  );
  const { total_videos, total_views, created_at } = useSelector(
    (state: RootState) => state.profile.aboutTab
  );

  const total_subscribers = useSelector(
    (state: RootState) => state.profile.profileBasicInfo?.total_subscribers
  );

  const [
    getProfileAbout,
    { isLoading: isGetProfileAboutLoading, errors: getProfileAboutErrors },
  ] = useAxios<{}, { profileAbout: IProfileAbout }>('api/users/' + username + '/about');

  const handleGetProfileAbout = async () => {
    const response = await getProfileAbout({});
    if (!response.success || !response.result) return;
    dispatch(setProfileAbout({ profileAbout: response.result.profileAbout }));
  };

  useEffect(() => {
    if (created_at !== '') return;
    handleGetProfileAbout();
  }, []);

  return (
    <ProfileAboutTab__Container>
      <ProfileAboutTab__Box>
        <ProfileAboutTab__Title>Description</ProfileAboutTab__Title>
        <ProfileAboutTab__Description>{channelDesc}</ProfileAboutTab__Description>
      </ProfileAboutTab__Box>
      {channelDesc !== '' && (
        <ProfileAboutTab__Box width={'300px'}>
          <ProfileAboutTab__Title>Stats</ProfileAboutTab__Title>
          <ProfileAboutTab__List>
            <ProfileAboutTab__Item>
              Joined{' '}
              <span>{created_at && new Date(created_at).toLocaleDateString()}</span>
            </ProfileAboutTab__Item>
            <ProfileAboutTab__Item>
              <span>{total_videos}</span> {total_videos === 1 ? 'video' : 'videos'}
            </ProfileAboutTab__Item>
            <ProfileAboutTab__Item>
              <span>{total_views}</span> {total_views === 1 ? 'view' : 'views'}
            </ProfileAboutTab__Item>
          </ProfileAboutTab__List>
        </ProfileAboutTab__Box>
      )}
    </ProfileAboutTab__Container>
  );
};

export default ProfileAboutTab;
