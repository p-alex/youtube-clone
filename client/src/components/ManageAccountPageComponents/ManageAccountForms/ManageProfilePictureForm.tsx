import Image from 'next/image';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  changeUserInfo,
  DEFAULT_PROFILE_PICTURE_URL,
} from '../../../app/features/authSlice';
import { RootState } from '../../../app/store';
import useAxiosWithRetry from '../../../hooks/requestHooks/useAxiosWithRetry';
import useZodVerifySchema from '../../../hooks/useZodVerifySchema';
import {
  changeProfilePictureSchema,
  ChangeProfilePictureSchemaType,
} from '../../../schemas/manageAccountFormSchemas';
import { Button } from '../../../ui/Button';
import { imageOptimizer } from '../../../utils/imageOptimizer';
import ReCaptchaCheckbox, {
  ReCaptchaType,
} from '../../ReCaptchaCheckbox/ReCaptchaCheckbox';
import {
  ManageAccountForm,
  ManageAccountForm__ErrorMessage,
  ManageAccountForm__ResultMessage,
} from '../ManageAccountChangeBox.styles';

const ManageFormChangeProfilePicture__Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  padding-top: 10px;
  & img {
    border-radius: 50%;
  }
`;

const ManageFormChangeProfilePicture__Btns = styled.div`
  display: flex;
  gap: 20px;
`;

const ManageProfilePictureForm = ({
  lastFocusableElement,
}: {
  lastFocusableElement: React.RefObject<HTMLButtonElement>;
}) => {
  const dispatch = useDispatch();

  const currentProfilePicture = useSelector(
    (state: RootState) => state.auth.user.profile_picture
  );

  const [state, setState] = useState<ChangeProfilePictureSchemaType>({
    newProfilePicture: '',
    reToken: '',
  });

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const reRef = useRef<ReCaptchaType>(null);

  const [changeProfilePictureRequest, { isLoading, errors }] = useAxiosWithRetry<
    ChangeProfilePictureSchemaType,
    { profile_picture: string }
  >('api/users/change/profilePicture', 'PATCH');

  const { verify, fieldErrors } = useZodVerifySchema(changeProfilePictureSchema, state);

  const handleChooseProfilePicture = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    const image = event.target.files[0];
    const file = new FileReader();
    file.readAsDataURL(image);
    file.onload = async () => {
      const optimizedImageUrl = await imageOptimizer(file.result, 380, 380, 380, 380);
      setState((prevState) => ({ ...prevState, newProfilePicture: optimizedImageUrl }));
    };
  };

  const handleResetState = () => {
    setState({ newProfilePicture: '', reToken: '' });
    reRef.current?.reset();
  };

  const handleChangeProfilePicture = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSuccess(false);
    const isValid = verify();
    if (!isValid) return handleResetState();
    const response = await changeProfilePictureRequest(state);
    if (!response.result) return reRef.current?.reset();
    dispatch(
      changeUserInfo({ key: 'profile_picture', value: response.result.profile_picture })
    );
    handleResetState();
    setIsSuccess(true);
  };

  return (
    <ManageAccountForm onSubmit={handleChangeProfilePicture}>
      {errors && errors[0].message && (
        <ManageAccountForm__ResultMessage isError>
          {errors[0].message}
        </ManageAccountForm__ResultMessage>
      )}

      {fieldErrors?.newProfilePicture && (
        <ManageAccountForm__ErrorMessage>
          {fieldErrors.newProfilePicture[0]}
        </ManageAccountForm__ErrorMessage>
      )}

      {isSuccess && (
        <ManageAccountForm__ResultMessage isError={false}>
          Profile picture has been changed successfully!
        </ManageAccountForm__ResultMessage>
      )}

      <ManageFormChangeProfilePicture__Container>
        <Image
          src={state.newProfilePicture ? state.newProfilePicture : currentProfilePicture}
          width={250}
          height={250}
          alt=""
          objectFit="cover"
        />

        <input
          type={'file'}
          onChange={handleChooseProfilePicture}
          style={{ display: 'none' }}
          id={'choose_profile_picture_input'}
          accept={'image/png, image/jpg, image/jpeg'}
        />

        <ManageFormChangeProfilePicture__Btns>
          {!state.newProfilePicture && (
            <Button
              variant="normal"
              type="button"
              onClick={() =>
                document.getElementById('choose_profile_picture_input')?.click()
              }
              autoFocus
              disabled={isLoading}
            >
              Change
            </Button>
          )}

          {state.newProfilePicture && (
            <Button
              variant="normal"
              onClick={() =>
                setState((prevState) => ({ ...prevState, newProfilePicture: '' }))
              }
              autoFocus
              disabled={isLoading}
            >
              Reset
            </Button>
          )}

          {currentProfilePicture !== DEFAULT_PROFILE_PICTURE_URL &&
            state.newProfilePicture !== DEFAULT_PROFILE_PICTURE_URL && (
              <Button
                variant="danger"
                onClick={() =>
                  setState((prevState) => ({
                    ...prevState,
                    newProfilePicture: DEFAULT_PROFILE_PICTURE_URL,
                  }))
                }
                disabled={isLoading}
                type="button"
              >
                Remove
              </Button>
            )}
        </ManageFormChangeProfilePicture__Btns>
      </ManageFormChangeProfilePicture__Container>

      <ReCaptchaCheckbox
        onChange={(event) => setState((prevState) => ({ ...prevState, reToken: event }))}
        error={fieldErrors?.reToken && fieldErrors.reToken[0]}
        reference={reRef}
      />

      <Button
        variant="primary"
        type="submit"
        ref={lastFocusableElement}
        disabled={isLoading}
      >
        {isLoading ? 'Loading' : 'Change profile picture'}
      </Button>
    </ManageAccountForm>
  );
};

export default ManageProfilePictureForm;
