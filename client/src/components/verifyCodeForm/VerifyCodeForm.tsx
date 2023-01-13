import { useState, useRef } from 'react';
import useAxios from '../../hooks/requestHooks/useAxios';
import useZodVerifyForm from '../../hooks/useZodVerifySchema';
import { verifyCodeSchema } from '../../schemas/verifyCode.schema';
import { Button } from '../../ui/Button';
import {
  Form,
  FormErrorMessage,
  FormLogoAndTitle,
  FormMessage,
  FormTitle,
  FormWrapper,
} from '../../ui/Form';
import { VerifyCodeSchemaType } from '../../schemas/verifyCode.schema';
import Logo from '../Logo/Logo';
import Link from 'next/link';
import InputGroup from '../../ui/InputGroup';
import ReCaptchaCheckbox, { ReCaptchaType } from '../ReCaptchaCheckbox/ReCaptchaCheckbox';

const VerifyCodeForm = ({
  title,
  whatToVerify,
  successMessage,
  linkText,
  linkSendTo,
}: {
  title: string;
  whatToVerify: 'email';
  successMessage: string;
  linkText: string;
  linkSendTo: string;
}) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [state, setState] = useState<VerifyCodeSchemaType>({
    code: '',
    reToken: '',
  });

  const reRef = useRef<ReCaptchaType>(null);

  const [verifyEmail, { isLoading, errors }] = useAxios<VerifyCodeSchemaType, null>(
    `api/auth/verify-${whatToVerify}`,
    'POST'
  );

  const { verify, fieldErrors } = useZodVerifyForm<VerifyCodeSchemaType>(
    verifyCodeSchema,
    state
  );

  const handleReset = () => {
    setState({ code: '', reToken: '' });
    reRef.current?.reset();
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const isValid = verify();
    if (!isValid) return;
    const response = await verifyEmail(state);
    if (!response.success) reRef.current?.reset();
    handleReset();
    setIsSuccess(true);
  };

  return (
    <FormWrapper>
      <Form onSubmit={onSubmit}>
        <FormLogoAndTitle>
          <Logo />
          <FormTitle>{title}</FormTitle>
        </FormLogoAndTitle>
        {!isSuccess && (
          <FormMessage>
            We sent you an email with a verification code. Check your inbox.
          </FormMessage>
        )}
        {isSuccess && <FormMessage>{successMessage}</FormMessage>}

        {errors &&
          errors.map((error) => {
            return (
              <FormErrorMessage key={error.message}>{error.message}</FormErrorMessage>
            );
          })}

        {!isSuccess && (
          <>
            <InputGroup
              type="text"
              label="code"
              value={state.code}
              setValue={(e) =>
                setState((prevState) => ({ ...prevState, ['code']: e.target.value }))
              }
              disabled={isLoading}
              error={fieldErrors.code && fieldErrors.code[0]}
            />

            <ReCaptchaCheckbox
              error={fieldErrors?.reToken && fieldErrors.reToken[0]}
              onChange={(e) =>
                setState((prevState) => ({ ...prevState, ['reToken']: e }))
              }
              reference={reRef}
            />

            <Button variant="primary" type="submit" disabled={isLoading}>
              Verify
            </Button>
          </>
        )}
        {isSuccess && (
          <Link href={linkSendTo}>
            <a>
              <Button variant="primary">{linkText}</Button>
            </a>
          </Link>
        )}
      </Form>
    </FormWrapper>
  );
};

export default VerifyCodeForm;
