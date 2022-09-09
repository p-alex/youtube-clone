import React from 'react';
import { BsYoutube } from 'react-icons/bs';
import Link from 'next/link';
import { BigLogo, LogoBackDrop } from './style';

const Logo = () => {
  return (
    <Link href={'/'}>
      <BigLogo>
        <LogoBackDrop>
          <BsYoutube />
        </LogoBackDrop>
        AlexTube
      </BigLogo>
    </Link>
  );
};

export default Logo;
