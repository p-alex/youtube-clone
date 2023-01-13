import Link from 'next/link';
import router from 'next/router';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { IUser, setUser } from '../app/features/authSlice';
import Logo from '../components/Logo/Logo';
import ReCaptchaCheckbox, {
  ReCaptchaType,
} from '../components/ReCaptchaCheckbox/ReCaptchaCheckbox';
import useAuth from '../hooks/authHooks/useAuth';
import useAxios from '../hooks/requestHooks/useAxios';
import useZodVerifyForm from '../hooks/useZodVerifySchema';
import { loginSchema, LoginSchemaType } from '../schemas/login.schema';
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

  const reRef = useRef<ReCaptchaType>(null);

  const [state, setState] = useState<LoginSchemaType>({
    email: '',
    password: '',
    reToken: '',
  });

  const [loginUser, { isLoading: isLoginUserLoading, errors: loginUserErrors }] =
    useAxios<
      LoginSchemaType,
      {
        user: IUser;
        accessToken: string;
      } | null
    >('api/auth', 'POST');

  const { verify, fieldErrors } = useZodVerifyForm(loginSchema, state);

  const handleReset = () => {
    setState({ email: '', password: '', reToken: '' });
    reRef.current?.reset();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = verify();
    if (!isValid) return;
    const { success, result } = await loginUser(state);
    if (success && result) {
      setIsLoggedIn(true);
      dispatch(setUser({ user: result.user, accessToken: result.accessToken }));
      handleReset();
      router.push('/');
    } else {
      reRef.current?.reset();
    }
  };

  useEffect(() => {
    if (isAuth) router.push('/');
  }, [isAuth]);

  return (
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
          value={state.email}
          setValue={(e) =>
            setState((prevState) => ({ ...prevState, ['email']: e.target.value }))
          }
          disabled={isLoginUserLoading || isLoggedIn}
          error={fieldErrors?.email && fieldErrors.email[0]}
        />

        <InputGroup
          type="password"
          label="password"
          value={state.password}
          setValue={(e) =>
            setState((prevState) => ({ ...prevState, ['password']: e.target.value }))
          }
          disabled={isLoginUserLoading || isLoggedIn}
          error={fieldErrors?.password && fieldErrors.password[0]}
        />

        <ReCaptchaCheckbox
          error={fieldErrors?.reToken && fieldErrors.reToken[0]}
          onChange={(e) => setState((prevState) => ({ ...prevState, ['reToken']: e }))}
          reference={reRef}
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
  );
};

export default SignIn;
