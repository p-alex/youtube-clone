import { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import useZodVerifyForm, { ZodVerifyFormErrors } from '../../hooks/useZodVerifyForm';
import { verifyCodeSchema } from '../../schemas/verifyCode.schema';
import { Button } from '../../ui/Button';
import {
  Form,
  FormErrorMessage,
  FormInput,
  FormLabel,
  FormLogoAndTitle,
  FormMessage,
  FormTitle,
  FormWrapper,
} from '../../ui/Form';
import { VerifyCodeSchemaType } from '../../schemas/verifyCode.schema';
import Logo from '../logo/Logo';
import Link from 'next/link';

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
  const [inputErrors, setInputErrors] = useState<
    ZodVerifyFormErrors<VerifyCodeSchemaType>
  >({});

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

  const verifyForm = useZodVerifyForm<{ code: string }>(verifyCodeSchema, { code });

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { isValid, errors } = verifyForm();
    if (!isValid) return setInputErrors(errors);
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

        {!isSuccess && (
          <>
            <FormLabel htmlFor="code">
              Code
              <FormInput
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={'Paste the code here'}
                disabled={isLoading}
              />
              <FormErrorMessage>{inputErrors.code && inputErrors.code}</FormErrorMessage>
              {errors &&
                errors.map((error) => {
                  return (
                    <FormErrorMessage key={error.message}>
                      {error.message}
                    </FormErrorMessage>
                  );
                })}
            </FormLabel>

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
