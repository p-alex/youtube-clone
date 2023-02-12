import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import useAxios from '../hooks/requestHooks/useAxios';
import { Button } from '../ui/Button';
import useZodVerifyForm from '../hooks/useZodVerifySchema';
import {
  createAccountSchema,
  CreateAccountSchemType,
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
import VerifyCodeForm from '../components/VerifyCodeForm/VerifyCodeForm';
import InputGroup from '../ui/InputGroup';
import { useRouter } from 'next/router';
import useAuth from '../hooks/authHooks/useAuth';
import Logo from '../ui/Logo/Logo';
import ReCaptchaCheckbox, {
  ReCaptchaType,
} from '../components/ReCaptchaCheckbox/ReCaptchaCheckbox';
import AuthProviderLink from '../ui/AuthProviderButton';

const SignUp = () => {
  const router = useRouter();
  const { isAuth } = useAuth();

  const reRef = useRef<ReCaptchaType>(null);

  const [state, setState] = useState<CreateAccountSchemType>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    reToken: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const [registerUser, { isLoading: isRegisterUserLoading, errors: registerUserErrors }] =
    useAxios<CreateAccountSchemType, null>('api/users', 'POST');

  const { verify, fieldErrors } = useZodVerifyForm(createAccountSchema, state);

  const handleReset = () => {
    setState({ email: '', username: '', password: '', confirmPassword: '', reToken: '' });
    reRef.current?.reset();
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = verify();
    if (!isValid) return;
    const response = await registerUser(state);
    if (!response.success) return reRef.current?.reset();
    handleReset();
    setIsSuccess(true);
  };

  useEffect(() => {
    if (isAuth) router.push('/');
  }, [isAuth]);

  return (
    <>
      <title>Sign Up | AlexTube</title>
      <meta name="description" content="Create an account now" />
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
              <FormTitle>Sign up</FormTitle>
            </FormLogoAndTitle>

            <AuthProviderLink providerName="google">Sign up with Google</AuthProviderLink>
            <br />

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
              value={state.email}
              setValue={(e) =>
                setState((prevState) => ({ ...prevState, ['email']: e.target.value }))
              }
              disabled={isRegisterUserLoading}
              error={fieldErrors?.email && fieldErrors.email[0]}
            />

            <InputGroup
              type="text"
              label="username"
              value={state.username}
              setValue={(e) =>
                setState((prevState) => ({ ...prevState, ['username']: e.target.value }))
              }
              disabled={isRegisterUserLoading}
              error={fieldErrors?.username && fieldErrors.username[0]}
            />

            <InputGroup
              type="password"
              label="password"
              value={state.password}
              setValue={(e) =>
                setState((prevState) => ({ ...prevState, ['password']: e.target.value }))
              }
              disabled={isRegisterUserLoading}
              error={fieldErrors?.password && fieldErrors.password[0]}
              withPasswordSchemaDisplay
            />

            <InputGroup
              type="password"
              label="Confirm Password"
              value={state.confirmPassword}
              setValue={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  ['confirmPassword']: e.target.value,
                }))
              }
              disabled={isRegisterUserLoading}
              error={fieldErrors?.confirmPassword && fieldErrors.confirmPassword[0]}
            />

            <ReCaptchaCheckbox
              error={fieldErrors?.reToken && fieldErrors.reToken[0]}
              onChange={(e) =>
                setState((prevState) => ({ ...prevState, ['reToken']: e }))
              }
              reference={reRef}
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
