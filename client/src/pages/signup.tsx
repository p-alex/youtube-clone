import Link from 'next/link';
import React, { useState } from 'react';
import Logo from '../components/logo/Logo';
import Layout from '../layout/Layout';
import useAxios from '../hooks/useAxios';
import { Button } from '../ui/Button';
import useZodVerifyForm, { ZodVerifyFormErrors } from '../hooks/useZodVerifyForm';
import {
  CreateAccountSchemType,
  createAccountSchema,
} from '../schemas/createAccount.schema';
import {
  Form,
  FormAlternativeParagraph,
  FormErrorMessage,
  FormLogoAndTitle,
  FormMessage,
  FormTitle,
  FormWrapper,
} from '../ui/Form';
import VerifyCodeForm from '../components/verifyCodeForm/VerifyCodeForm';
import InputGroup from '../ui/InputGroup';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<ZodVerifyFormErrors<CreateAccountSchemType>>({});

  const [isSuccess, setIsSuccess] = useState(false);

  const [registerUser, { isLoading: isRegisterUserLoading, errors: registerUserErrors }] =
    useAxios<
      {
        email: string;
        username: string;
        password: string;
        confirmPassword: string;
      },
      null
    >('api/users', 'POST');

  const verifyForm = useZodVerifyForm(createAccountSchema, {
    email,
    username,
    password,
    confirmPassword,
  });

  const handleResetForm = () => {
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const { isValid, errors } = verifyForm();
    if (!isValid) return setErrors(errors);
    try {
      const response = await registerUser({ email, username, password, confirmPassword });
      if (!response.success) return;
      handleResetForm();
      setIsSuccess(true);
    } catch (error) {
    } finally {
      setErrors({});
    }
  };

  return (
    <Layout>
      {isSuccess && (
        <VerifyCodeForm
          title="Verify your email"
          whatToVerify="email"
          successMessage="Success! You can now login."
          linkSendTo="/signin"
          linkText="Login"
        />
      )}
      {!isSuccess && (
        <FormWrapper>
          <Form onSubmit={onSubmit}>
            <FormLogoAndTitle>
              <Logo />
              <FormTitle>Create an account</FormTitle>
            </FormLogoAndTitle>
            {isSuccess && (
              <FormMessage>
                Success! Please check your inbox for email verification
              </FormMessage>
            )}
            {registerUserErrors &&
              registerUserErrors.map((error) => {
                return (
                  <FormErrorMessage key={error.message}>{error.message}</FormErrorMessage>
                );
              })}

            <InputGroup
              type="text"
              label="email"
              value={email}
              setValue={(e) => setEmail(e.target.value)}
              disabled={isRegisterUserLoading}
              error={errors.email && errors.email}
            />

            <InputGroup
              type="text"
              label="username"
              value={username}
              setValue={(e) => setUsername(e.target.value)}
              disabled={isRegisterUserLoading}
              error={errors.username && errors.username}
            />

            <InputGroup
              type="password"
              label="password"
              value={password}
              setValue={(e) => setPassword(e.target.value)}
              disabled={isRegisterUserLoading}
              error={errors.password && errors.password}
            />

            <InputGroup
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              setValue={(e) => setConfirmPassword(e.target.value)}
              disabled={isRegisterUserLoading}
              error={errors.confirmPassword && errors.confirmPassword}
            />

            <Button variant="primary" type="submit" disabled={isRegisterUserLoading}>
              Create account
            </Button>

            <FormAlternativeParagraph>
              Already have an account?{' '}
              <Link href={'/signin'}>
                <a>Login</a>
              </Link>
            </FormAlternativeParagraph>
          </Form>
        </FormWrapper>
      )}
    </Layout>
  );
};

export default SignUp;
