import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Logo from '../components/logo/Logo';
import Layout from '../layout/Layout';
import { MOBILE_BREAK_POINT, NAV_BAR_HEIGHT } from '../layout/style';
import { registerUser } from '../services/user.service';
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
  margin-bottom: 5px;
`;

const FormInput = styled.input`
  display: block;
  border: solid red 1px;
  width: 100%;
  border: solid 1px ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.inputBg};
  padding: 8px;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 20px;
`;

const FormSubmit = styled.button`
  display: block;
  width: 100%;
  align-items: center;
  padding: 10px;
  background-color: ${(props) => props.theme.accentColor};
  color: #111;
  border: none;
  text-transform: uppercase;
  font-weight: bold;
  margin-top: 20px;
  border-radius: 2px;
`;

const SignInParagraph = styled.p`
  color: ${(props) => props.theme.textColor};
  margin-top: 15px;
  & a {
    color: ${(props) => props.theme.accentColor};
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 15px;
`;

const SuccessMessage = styled.p`
  color: lightgreen;
  margin-bottom: 15px;
`;

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {
    mutate: register,
    isLoading,
    data,
  } = useMutation(() => registerUser({ email, username, password, confirmPassword }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && username && password && confirmPassword) register();
  };

  useEffect(() => {
    const handleRedirectToLogin = () => {
      router.push('/signin');
    };
    if (data?.success) {
      setEmail('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setTimeout(handleRedirectToLogin, 400);
    }
  }, [data]);

  return (
    <Layout>
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <LogoAndTitle>
            <Logo />
            <FormTitle>Sign Up</FormTitle>
          </LogoAndTitle>
          {data?.success && <SuccessMessage>Success</SuccessMessage>}
          {data?.errors &&
            data.errors.map((error) => {
              return <ErrorMessage key={error.message}>{error.message}</ErrorMessage>;
            })}
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormLabel htmlFor="username">Username</FormLabel>
          <FormInput
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormLabel htmlFor="password">Password</FormLabel>
          <FormInput
            type={'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
          <FormInput
            type={'password'}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FormSubmit
            type="submit"
            disabled={!email || !username || !password || !confirmPassword}
          >
            {isLoading ? 'Loading' : 'Sign Up'}
          </FormSubmit>
          <SignInParagraph>
            Already have an account?{' '}
            <Link href={'/signin'}>
              <a>{isLoading ? 'Loading' : 'Sign up'}</a>
            </Link>
          </SignInParagraph>
        </Form>
      </Wrapper>
    </Layout>
  );
};

export default SignUp;
