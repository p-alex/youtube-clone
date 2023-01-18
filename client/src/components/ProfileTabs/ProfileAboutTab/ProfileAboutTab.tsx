import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IProfileAbout } from '../../../app/features/profileSlice';
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
  const profileInfo = useSelector((state: RootState) => state.profile.profileInfo);
  return (
    <ProfileAboutTab__Container>
      <ProfileAboutTab__Box>
        <ProfileAboutTab__Title>Description</ProfileAboutTab__Title>
        <ProfileAboutTab__Description>
          {profileInfo?.description}
        </ProfileAboutTab__Description>
      </ProfileAboutTab__Box>
      {profileInfo?.description !== '' && (
        <ProfileAboutTab__Box width={'300px'}>
          <ProfileAboutTab__Title>Stats</ProfileAboutTab__Title>
          <ProfileAboutTab__List>
            <ProfileAboutTab__Item>
              Joined{' '}
              <span>
                {profileInfo?.created_at &&
                  new Date(profileInfo?.created_at).toLocaleDateString()}
              </span>
            </ProfileAboutTab__Item>
            <ProfileAboutTab__Item>
              <span>{profileInfo?.total_videos}</span>{' '}
              {profileInfo?.total_videos === 1 ? 'video' : 'videos'}
            </ProfileAboutTab__Item>
            <ProfileAboutTab__Item>
              <span>{profileInfo?.total_views}</span>{' '}
              {profileInfo?.total_views === 1 ? 'view' : 'views'}
            </ProfileAboutTab__Item>
          </ProfileAboutTab__List>
        </ProfileAboutTab__Box>
      )}
    </ProfileAboutTab__Container>
  );
};

export default ProfileAboutTab;
