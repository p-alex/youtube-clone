import React from 'react';
import Link from 'next/link';
import { BigLogo, CustomLogo } from './style';
import { BsFillPlayFill } from 'react-icons/bs';

const Logo = () => {
  return (
    <Link href={'/'}>
      <BigLogo>
        <CustomLogo>
          <BsFillPlayFill />
        </CustomLogo>
        AlexTube
      </BigLogo>
    </Link>
  );
};

export default Logo;
