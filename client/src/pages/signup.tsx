import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from '../components/logo/Logo';
import Layout from '../layout/Layout';
import { MOBILE_BREAK_POINT, NAV_BAR_HEIGHT } from '../layout/style';
import useAxios from '../hooks/useAxios';
import { Button } from '../ui/Button';
import useZodVerifyForm, { ZodVerifyFormErrors } from '../hooks/useZodVerifyForm';
import {
  CreateAccountSchemType,
  createAccountSchema,
} from '../schemas/createAccount.schema';
import router from 'next/router';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh);
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    width: 100%;
    align-items: flex-start;
    justify-content: center;
    margin-top: calc(${NAV_BAR_HEIGHT}px + 40px);
  }
`;

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  display: block;
  border: solid 1px ${(props) => props.theme.borderColor};
  padding: 30px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.uiBg};
  @media (max-width: 390px) {
    width: 100%;
    margin: 0 20px;
  }
`;

const LogoAndTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const FormTitle = styled.h1`
  color: ${(props) => props.theme.textColor};
  margin-bottom: 40px;
  font-size: 1.3rem;
  width: max-content;
`;

const FormLabel = styled.label`
  display: block;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 15px;
`;

const FormInput = styled.input`
  display: block;
  width: 100%;
  border: solid 1px ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.inputBg};
  padding: 8px;
  font-size: 1rem;
  width: 100%;
`;

const SignInParagraph = styled.p`
  color: ${(props) => props.theme.textColor};
  margin-top: 15px;
  & a {
    color: ${(props) => props.theme.accentColor};
  }
`;

const ErrorMessage = styled.small`
  color: red;
  margin-bottom: 15px;
`;

const SuccessMessage = styled.p`
  color: ${(props) => props.theme.textColor};
  font-weight: 700;
  margin-bottom: 15px;
`;

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
      // handleResetForm();
      setIsSuccess(true);
    } catch (error) {
    } finally {
      setErrors({});
    }
  };

  return (
    <Layout>
      <Wrapper>
        <Form onSubmit={onSubmit}>
          <LogoAndTitle>
            <Logo />
            <FormTitle>Create an account</FormTitle>
          </LogoAndTitle>
          {isSuccess && (
            <SuccessMessage>
              Success! Please check your inbox for email verification
            </SuccessMessage>
          )}
          {registerUserErrors &&
            registerUserErrors.map((error) => {
              return <ErrorMessage key={error.message}>{error.message}</ErrorMessage>;
            })}
          <FormLabel htmlFor="email">
            Email
            <FormInput
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={'example@example.com'}
              disabled={isRegisterUserLoading}
            />
            <ErrorMessage>{errors.email && errors.email}</ErrorMessage>
          </FormLabel>
          <FormLabel htmlFor="username">
            Username
            <FormInput
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isRegisterUserLoading}
            />
            <ErrorMessage>{errors.username && errors.username}</ErrorMessage>
          </FormLabel>
          <FormLabel htmlFor="password">
            Password
            <FormInput
              type={'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isRegisterUserLoading}
            />
            <ErrorMessage>{errors.password && errors.password}</ErrorMessage>
          </FormLabel>
          <FormLabel htmlFor="confirmPassword">
            Confirm Password
            <FormInput
              type={'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isRegisterUserLoading}
            />
            <ErrorMessage>
              {errors.confirmPassword && errors.confirmPassword}
            </ErrorMessage>
          </FormLabel>
          <Button variant="primary" type="submit" disabled={isRegisterUserLoading}>
            {isRegisterUserLoading ? 'Loading' : 'Create account'}
          </Button>
          <SignInParagraph>
            Already have an account?{' '}
            <Link href={'/signin'}>
              <a>{'Login'}</a>
            </Link>
          </SignInParagraph>
        </Form>
      </Wrapper>
    </Layout>
  );
};

export default SignUp;
