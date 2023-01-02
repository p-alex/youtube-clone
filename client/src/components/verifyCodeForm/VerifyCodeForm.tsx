import { useState } from 'react';
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
  const [code, setCode] = useState('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [verifyEmail, { isLoading, errors }] = useAxios<{ code: string }, null>(
    `api/auth/verify-${whatToVerify}`,
    'POST'
  );

  const handleVerifyEmail = async () => {
    const response = await verifyEmail({ code });
    if (response.success) {
      setIsSuccess(true);
    }
  };

  const { verify, fieldErrors } = useZodVerifyForm<VerifyCodeSchemaType>(
    verifyCodeSchema,
    { code }
  );

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const isValid = verify();
    if (!isValid) return;
    handleVerifyEmail();
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
              value={code}
              setValue={(e) => setCode(e.target.value)}
              disabled={isLoading}
              error={fieldErrors.code && fieldErrors.code[0]}
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
