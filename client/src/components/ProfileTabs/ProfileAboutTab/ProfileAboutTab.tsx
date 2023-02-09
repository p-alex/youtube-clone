import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfileDescription } from '../../../app/features/profileSlice';
import { RootState } from '../../../app/store';
import useAxiosWithRetry from '../../../hooks/requestHooks/useAxiosWithRetry';
import useZodVerifySchema from '../../../hooks/useZodVerifySchema';
import {
  changeDescriptionFormSchema,
  MAX_PROFILE_DESCRIPTION_LENGTH,
} from '../../../schemas/manageAccountFormSchemas';
import AutoResizingTextarea from '../../../ui/AutoResizeTextarea';
import { Button } from '../../../ui/Button';
import {
  ProfileAboutTab__Box,
  ProfileAboutTab__ChangeDescriptionFormContainer,
  ProfileAboutTab__Container,
  ProfileAboutTab__Description,
  ProfileAboutTab__Item,
  ProfileAboutTab__List,
  ProfileAboutTab__Title,
} from './ProfileAboutTab.styles';

const ProfileAboutTab = () => {
  const dispatch = useDispatch();
  const profileInfo = useSelector((state: RootState) => state.profile.profileInfo);
  const currentUserId = useSelector((state: RootState) => state.auth.user.user_id);
  const [isEditMode, setIsEditMode] = useState(false);

  const [newDescription, setNewDescription] = useState(profileInfo!.description);

  const { verify, fieldErrors } = useZodVerifySchema(changeDescriptionFormSchema, {
    newDescription,
  });

  const [
    changeDescriptionRequest,
    { isLoading: isChangeDescriptionLoading, errors: changeDescriptionErrors },
  ] = useAxiosWithRetry<{ newDescription: string }, { newDescription: string }>(
    'api/users/change/description',
    'PATCH'
  );

  const handleChangeDescription = async (event: React.FormEvent) => {
    event.preventDefault();
    const isValid = verify();
    if (!isValid) return;
    const response = await changeDescriptionRequest({ newDescription });
    if (!response.success || !response.result) return;
    dispatch(
      changeProfileDescription({ newDescription: response.result.newDescription })
    );
    setIsEditMode(false);
    setNewDescription(response.result.newDescription);
  };

  return (
    <ProfileAboutTab__Container>
      <ProfileAboutTab__Box>
        <ProfileAboutTab__Title>Description</ProfileAboutTab__Title>
        {isEditMode && (
          <ProfileAboutTab__ChangeDescriptionFormContainer
            onSubmit={handleChangeDescription}
          >
            <AutoResizingTextarea
              label="new description"
              value={newDescription}
              setValue={(e) => setNewDescription(e.target.value)}
              autoFocus
              error={fieldErrors?.newDescription && fieldErrors.newDescription[0]}
              maxLength={MAX_PROFILE_DESCRIPTION_LENGTH}
              placeholder={'Change your description...'}
            />

            <Button
              variant="primary"
              type="submit"
              disabled={
                isChangeDescriptionLoading || newDescription === profileInfo?.description
              }
            >
              Save changes
            </Button>
            <Button
              variant="normal"
              type="button"
              onClick={() => setIsEditMode((prevState) => !prevState)}
            >
              Cancel
            </Button>
          </ProfileAboutTab__ChangeDescriptionFormContainer>
        )}

        {!isEditMode && (
          <ProfileAboutTab__Description>
            {profileInfo?.description}
          </ProfileAboutTab__Description>
        )}

        {currentUserId === profileInfo?.user_id && !isEditMode && (
          <Button
            variant="primary"
            type="button"
            onClick={() => setIsEditMode((prevState) => !prevState)}
          >
            Edit description
          </Button>
        )}
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
