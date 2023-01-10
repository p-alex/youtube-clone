import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import useAxios from '../hooks/requestHooks/useAxios';
import { Button } from '../ui/Button';
import useZodVerifyForm from '../hooks/useZodVerifySchema';
import { createAccountSchema } from '../schemas/createAccount.schema';
import {
  Form,
  FormAlternativeParagraph,
  FormErrorMessage,
  FormLogoAndTitle,
  FormMessage,
  FormTitle,
  FormWrapper,
} from '../ui/Form';
import VerifyCodeForm from '../components/VerifyCodeForm/VerifyCodeForm';
import InputGroup from '../ui/InputGroup';
import { useRouter } from 'next/router';
import useAuth from '../hooks/authHooks/useAuth';
import Logo from '../components/Logo/Logo';

const SignUp = () => {
  const router = useRouter();
  const { isAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const { verify, fieldErrors } = useZodVerifyForm(createAccountSchema, {
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
    const isValid = verify();
    if (!isValid) return;
    const response = await registerUser({ email, username, password, confirmPassword });
    if (!response.success) return;
    handleResetForm();
    setIsSuccess(true);
  };

  useEffect(() => {
    if (isAuth) router.push('/');
  }, [isAuth]);

  return (
    <>
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
              error={fieldErrors?.email && fieldErrors.email[0]}
            />

            <InputGroup
              type="text"
              label="username"
              value={username}
              setValue={(e) => setUsername(e.target.value)}
              disabled={isRegisterUserLoading}
              error={fieldErrors?.username && fieldErrors.username[0]}
            />

            <InputGroup
              type="password"
              label="password"
              value={password}
              setValue={(e) => setPassword(e.target.value)}
              disabled={isRegisterUserLoading}
              error={fieldErrors?.password && fieldErrors.password[0]}
            />

            <InputGroup
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              setValue={(e) => setConfirmPassword(e.target.value)}
              disabled={isRegisterUserLoading}
              error={fieldErrors?.confirmPassword && fieldErrors.confirmPassword[0]}
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
    </>
  );
};

export default SignUp;
