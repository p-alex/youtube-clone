import Link from 'next/link';
import router from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IUser, setUser } from '../app/features/authSlice';
import Logo from '../components/logo/Logo';
import useAxios from '../hooks/useAxios';
import useZodVerifyForm, { ZodVerifyFormErrors } from '../hooks/useZodVerifyForm';
import Layout from '../layout/Layout';
import { loginSchema, LoginSchemaType } from '../schemas/login.schema';
import { Button } from '../ui/Button';
import {
  Form,
  FormAlternativeParagraph,
  FormErrorMessage,
  FormInput,
  FormLabel,
  FormLogoAndTitle,
  FormTitle,
  FormWrapper,
} from '../ui/Form';

const SignIn = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<ZodVerifyFormErrors<LoginSchemaType>>({});
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

  const verifyForm = useZodVerifyForm(loginSchema, { email, password });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const { isValid, errors } = verifyForm();
    if (!isValid) return setErrors(errors);
    const { success, result } = await loginUser({ email, password });
    if (success && result) {
      dispatch(setUser({ user: result.user, accessToken: result.accessToken }));
      router.push('/');
    }
  };

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

          <FormLabel htmlFor="email">
            Email
            <FormInput
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoginUserLoading}
            />
            <FormErrorMessage>{errors.email && errors.email}</FormErrorMessage>
          </FormLabel>

          <FormLabel htmlFor="password">
            Password
            <FormInput
              type={'password'}
              id="password"
              value={password}
              disabled={isLoginUserLoading}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormErrorMessage>{errors.password && errors.password}</FormErrorMessage>
          </FormLabel>

          <Button variant="primary" type="submit" disabled={isLoginUserLoading}>
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
