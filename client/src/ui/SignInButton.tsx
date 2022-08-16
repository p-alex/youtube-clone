import React from 'react';
import styled from 'styled-components';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export const Link = styled.a`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  gap: 10px;
  color: ${(props) => props.theme.accentColor};
  border: solid 2px ${(props) => props.theme.accentColor};
  text-transform: uppercase;
  font-weight: bold;
  width: max-content;
`;

const SignInButton = () => {
  return (
    <Link href={'/signin'}>
      <AccountCircleOutlinedIcon />
      Sign In
    </Link>
  );
};

export default SignInButton;
