import React from 'react';
import Link from 'next/link';
import { Logo__Container, Logo__Custom } from './Logo.styles';
import { BsCameraVideoFill } from 'react-icons/bs';

const Logo = () => {
  return (
    <Link href={'/'}>
      <Logo__Container>
        <Logo__Custom>
          <BsCameraVideoFill />
        </Logo__Custom>
        AlexTube
      </Logo__Container>
    </Link>
  );
};

export default Logo;
