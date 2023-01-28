import React from 'react';
import { Text } from '../../ui/Text';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { Footer__Container, Footer__Socials, Footer__SocialLink } from './Footer.styles';

const Footer = () => {
  return (
    <Footer__Container>
      <Footer__Socials>
        <Footer__SocialLink
          href="https://github.com/p-alex"
          target={'_blank'}
          rel="noopener"
        >
          <AiFillGithub />
        </Footer__SocialLink>
        <Footer__SocialLink
          href="https://www.linkedin.com/in/alexandru-daniel-pistol/"
          target={'_blank'}
          rel="noopener"
        >
          <AiFillLinkedin />
        </Footer__SocialLink>
      </Footer__Socials>
      <Text isMuted>
        Developed by <br />
        <span>Pistol Alexandru Daniel</span>
      </Text>
    </Footer__Container>
  );
};

export default Footer;
