import React from 'react';
import Link from 'next/link';
import { BigLogo, CustomLogo } from './style';

const Logo = () => {
  return (
    <Link href={'/'}>
      <BigLogo>
        <CustomLogo />
        AlexTube
      </BigLogo>
    </Link>
  );
};

export default Logo;
