import React from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import styled from 'styled-components';

const BigLogo = styled.a`
  display: flex;
  align-items: center;
  gap: 2px;
  color: ${(props) => props.theme.textColor};
  font-weight: bold;
  cursor: pointer;
  & svg {
    font-size: 2.1rem;
    color: #fe0001;
  }
`;

const Logo = () => {
  return (
    <BigLogo>
      <YouTubeIcon />
      AlexTube
    </BigLogo>
  );
};

export default Logo;
