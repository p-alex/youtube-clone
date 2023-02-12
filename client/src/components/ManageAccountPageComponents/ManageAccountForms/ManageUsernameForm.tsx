import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import useAxiosWithRetry from '../../../hooks/requestHooks/useAxiosWithRetry';
import useZodVerifySchema from '../../../hooks/useZodVerifySchema';
import { Button } from '../../../ui/Button';
import InputGroup from '../../../ui/InputGroup';
import ReCAPTCHA from 'react-google-recaptcha';
import { changeUserInfo } from '../../../app/features/authSlice';
import ReCaptchaCheckbox from '../../ReCaptchaCheckbox/ReCaptchaCheckbox';
import {
  changeUsernameSchema,
  ChangeUsernameSchemaType,
} from '../../../schemas/manageAccountFormSchemas';
import { MODAL_LAST_FOCUSABLE_ELEMENT } from '../../../ui/Modal/Modal';
import { ErrorText, Text } from '../../../ui/Text';

const ManageUsernameForm = () => {
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState<true | null>(null);

  const [state, setState] = useState({
    newUsername: '',
    reToken: '',
  });

  const reRef = useRef<ReCAPTCHA>(null);

  const [changeUsernameRequest, { isLoading, errors }] = useAxiosWithRetry<
    ChangeUsernameSchemaType,
    { username: string }
  >('api/users/change/username', 'PATCH');

  const { verify, fieldErrors } = useZodVerifySchema(changeUsernameSchema, state);

  const handleResetState = () => {
    setState({ newUsername: '', reToken: '' });
    reRef.current?.reset();
  };

  const handleChangeUsername = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSuccess(null);
    const isValidData = verify();
    if (!isValidData) return;
    const response = await changeUsernameRequest(state);
    if (!response.result) return reRef.current?.reset();
    dispatch(changeUserInfo({ key: 'username', value: response.result.username }));
    handleResetState();
    setIsSuccess(true);
  };

  return (
    <form onSubmit={handleChangeUsername}>
      {errors && errors[0].message && (
        <ErrorText size="small">{errors[0].message}</ErrorText>
      )}

      {isSuccess && (
        <Text isMuted size="small">
          Username has been changed successfully!
        </Text>
      )}

      <InputGroup
        label="New username"
        type="text"
        value={state.newUsername}
        setValue={(e) =>
          setState((prevState) => ({ ...prevState, ['newUsername']: e.target.value }))
        }
        disabled={isLoading}
        error={fieldErrors?.newUsername && fieldErrors.newUsername[0]}
        placeholder="Type a new username"
        autoFocus
      />

      <ReCaptchaCheckbox
        onChange={(e) => setState((prevState) => ({ ...prevState, ['reToken']: e }))}
        reference={reRef}
        error={fieldErrors?.reToken && fieldErrors.reToken[0]}
      />

      <Button
        variant="primary"
        type="submit"
        disabled={isLoading}
        id={MODAL_LAST_FOCUSABLE_ELEMENT}
      >
        {isLoading ? 'Loading' : 'Change username'}
      </Button>
    </form>
  );
};

export default ManageUsernameForm;
