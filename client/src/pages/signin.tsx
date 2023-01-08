import Link from 'next/link';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IUser, setUser } from '../app/features/authSlice';
import Logo from '../components/Logo/Logo';
import useAuth from '../hooks/authHooks/useAuth';
import useAxios from '../hooks/requestHooks/useAxios';
import useZodVerifyForm from '../hooks/useZodVerifySchema';
import Layout from '../layout/Layout';
import { loginSchema } from '../schemas/login.schema';
import { Button } from '../ui/Button';
import {
  Form,
  FormAlternativeParagraph,
  FormErrorMessage,
  FormLogoAndTitle,
  FormTitle,
  FormWrapper,
} from '../ui/Form';
import InputGroup from '../ui/InputGroup';

const SignIn = () => {
  const { isAuth } = useAuth();
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginUser, { isLoading: isLoginUserLoading, errors: loginUserErrors }] =
    useAxios<
      { email: string; password: string },
      {
        user: IUser;
        accessToken: string;
      } | null
    >('api/auth', 'POST');

  const { verify, fieldErrors } = useZodVerifyForm(loginSchema, { email, password });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = verify();
    if (!isValid) return;
    const { success, result } = await loginUser({ email, password });
    if (success && result) {
      setIsLoggedIn(true);
      dispatch(setUser({ user: result.user, accessToken: result.accessToken }));
      router.push('/');
    }
  };

  useEffect(() => {
    if (isAuth) router.push('/');
  }, [isAuth]);

  return (
    <Layout>
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <FormLogoAndTitle>
            <Logo />
            <FormTitle>Login</FormTitle>
          </FormLogoAndTitle>

          {loginUserErrors &&
            loginUserErrors.map((error) => {
              return (
                <FormErrorMessage key={error.message}>{error.message}</FormErrorMessage>
              );
            })}

          <InputGroup
            type="text"
            label="email"
            value={email}
            setValue={(e) => setEmail(e.target.value)}
            disabled={isLoginUserLoading || isLoggedIn}
            error={fieldErrors?.email && fieldErrors.email[0]}
          />

          <InputGroup
            type="password"
            label="password"
            value={password}
            setValue={(e) => setPassword(e.target.value)}
            disabled={isLoginUserLoading || isLoggedIn}
            error={fieldErrors?.password && fieldErrors.password[0]}
          />

          <Button
            variant="primary"
            type="submit"
            disabled={isLoginUserLoading || isLoggedIn}
          >
            Login
          </Button>

          <FormAlternativeParagraph>
            Don&apos;t have an account?{' '}
            <Link href={'/signup'}>
              <a>Create an account</a>
            </Link>
          </FormAlternativeParagraph>
        </Form>
      </FormWrapper>
    </Layout>
  );
};

export default SignIn;
