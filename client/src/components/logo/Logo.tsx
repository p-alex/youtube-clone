import React from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Link from 'next/link';
import { BigLogo } from './style';

const Logo = () => {
  return (
    <Link href={'/'}>
      <BigLogo>
        <YouTubeIcon />
        AlexTube
      </BigLogo>
    </Link>
  );
};

export default Logo;
