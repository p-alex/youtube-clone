import React, { useRef, useState } from 'react';
import useAxiosWithRetry from '../../../hooks/requestHooks/useAxiosWithRetry';
import useZodVerifySchema from '../../../hooks/useZodVerifySchema';
import {
  changePasswordFormSchema,
  ChangePasswordSchemaType,
} from '../../../schemas/manageAccountFormSchemas';
import { Button } from '../../../ui/Button';
import InputGroup from '../../../ui/InputGroup';
import { ErrorText, Text } from '../../../ui/Text';
import { MODAL_LAST_FOCUSABLE_ELEMENT } from '../../../ui/Modal/Modal';
import ReCaptchaCheckbox, {
  ReCaptchaType,
} from '../../ReCaptchaCheckbox/ReCaptchaCheckbox';

const ManageProfilePasswordForm = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const reRef = useRef<ReCaptchaType>(null);

  const [state, setState] = useState<ChangePasswordSchemaType>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    reToken: '',
  });

  const [changePasswordRequest, { isLoading, errors }] = useAxiosWithRetry<
    ChangePasswordSchemaType,
    null
  >('api/users/change/password', 'PATCH');

  const { verify, fieldErrors } = useZodVerifySchema(changePasswordFormSchema, state);

  const handleResetState = () => {
    setState({ currentPassword: '', newPassword: '', confirmPassword: '', reToken: '' });
    reRef.current?.reset();
  };

  const handleChangePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSuccess(false);
    const isValid = verify();
    if (!isValid) return;
    const response = await changePasswordRequest(state);
    if (!response.success) return reRef.current?.reset();
    handleResetState();
    setIsSuccess(true);
  };

  return (
    <form onSubmit={handleChangePassword}>
      {errors && errors[0].message && (
        <ErrorText size="small">{errors[0].message}</ErrorText>
      )}

      {isSuccess && <Text isMuted>Password has been changed successfully!</Text>}

      <InputGroup
        label="current password"
        type="password"
        value={state.currentPassword}
        setValue={(event) =>
          setState((prevState) => ({
            ...prevState,
            ['currentPassword']: event.target.value,
          }))
        }
        disabled={isLoading}
        error={fieldErrors?.currentPassword && fieldErrors.currentPassword[0]}
        autoFocus
      />

      <InputGroup
        label="new password"
        type="password"
        value={state.newPassword}
        setValue={(event) =>
          setState((prevState) => ({
            ...prevState,
            ['newPassword']: event.target.value,
          }))
        }
        disabled={isLoading}
        error={fieldErrors?.newPassword && fieldErrors.newPassword[0]}
      />

      <InputGroup
        label="confirm password"
        type="password"
        value={state.confirmPassword}
        setValue={(event) =>
          setState((prevState) => ({
            ...prevState,
            ['confirmPassword']: event.target.value,
          }))
        }
        disabled={isLoading}
        error={fieldErrors?.confirmPassword && fieldErrors.confirmPassword[0]}
      />

      <ReCaptchaCheckbox
        onChange={(event) =>
          setState((prevState) => ({ ...prevState, ['reToken']: event! }))
        }
        reference={reRef}
        error={fieldErrors?.reToken && fieldErrors.reToken[0]}
      />

      <Button variant="primary" type="submit" id={MODAL_LAST_FOCUSABLE_ELEMENT}>
        Change password
      </Button>
    </form>
  );
};

export default ManageProfilePasswordForm;
