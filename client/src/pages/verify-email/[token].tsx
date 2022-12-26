import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Logo from '../../components/logo/Logo';
import useAxios from '../../hooks/requestHooks/useAxios';
import Spinner from '../../ui/Spinner';

const VerifyEmailContainer = styled.div`
  background-color: ${(props) => props.theme.uiBg};
  color: ${(props) => props.theme?.textColor};
  padding: 15px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 15px;
  & a {
    color: ${(props) => props.theme.primaryBtn?.textColor};
    font-weight: 700;
  }
`;

const ResultMessage = styled.p`
  color: ${(props) => props.theme?.textColor};
`;

const VerifyEmail = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const token = useRouter().query.token as string;

  const [verifyEmail, { isLoading, errors }] = useAxios<{ token: string }, null>(
    'api/auth/verify-email',
    'POST'
  );

  const handleVerifyEmail = async () => {
    const response = await verifyEmail({ token });
    if (response.success) {
      setIsSuccess(true);
    }
  };

  useEffect(() => {
    handleVerifyEmail();
  }, []);

  return (
    <VerifyEmailContainer>
      <Logo />
      {isLoading && <Spinner />}
      {isSuccess && <ResultMessage>Email verified successfully!</ResultMessage>}
      {isSuccess && <Link href={'/login'}>Login</Link>}
      {errors && <ResultMessage>{errors[0]?.message}</ResultMessage>}
    </VerifyEmailContainer>
  );
};

export default VerifyEmail;
