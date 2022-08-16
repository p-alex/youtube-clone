import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setUser } from '../app/features/authSlice';
import Logo from '../components/logo/Logo';
import Layout from '../layout/Layout';
import { loginUser } from '../services/auth.service';

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
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

const SignUpParagraph = styled.p`
  color: ${(props) => props.theme.textColor};
  margin-top: 20px;
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

const SignIn = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('qwerty');

  const {
    mutate: login,
    isLoading,
    data,
  } = useMutation(() => loginUser({ email, password }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login();
    }
  };

  useEffect(() => {
    if (data?.accessToken) {
      setEmail('');
      setPassword('');
      dispatch(setUser({ user: data.user, accessToken: data.accessToken }));
      router.push('/');
    }
  }, [data, dispatch]);

  return (
    <Layout>
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <LogoAndTitle>
            <Logo />
            <FormTitle>Sign In</FormTitle>
          </LogoAndTitle>
          {data && <SuccessMessage>Success</SuccessMessage>}
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
          <FormLabel htmlFor="password">Password</FormLabel>
          <FormInput
            type={'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormSubmit type="submit">{isLoading ? 'Loading' : 'Sign in'}</FormSubmit>
          <SignUpParagraph>
            Don&apos;t have an account?{' '}
            <Link href={'/signup'}>
              <a>Sign up</a>
            </Link>
          </SignUpParagraph>
        </Form>
      </Wrapper>
    </Layout>
  );
};

export default SignIn;
