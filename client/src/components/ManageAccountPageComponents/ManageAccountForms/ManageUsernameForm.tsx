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
import {
  ManageAccountForm,
  ManageAccountForm__ResultMessage,
} from '../ManageAccountChangeBox.styles';

const ManageUsernameForm = ({
  lastFocusableElement,
}: {
  lastFocusableElement: React.RefObject<HTMLButtonElement>;
}) => {
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
    <ManageAccountForm onSubmit={handleChangeUsername}>
      {errors && errors[0].message && (
        <ManageAccountForm__ResultMessage isError>
          {errors[0].message}
        </ManageAccountForm__ResultMessage>
      )}

      {isSuccess && (
        <ManageAccountForm__ResultMessage isError={false}>
          Username has been changed successfully!
        </ManageAccountForm__ResultMessage>
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
        ref={lastFocusableElement}
      >
        {isLoading ? 'Loading' : 'Change username'}
      </Button>
    </ManageAccountForm>
  );
};

export default ManageUsernameForm;
