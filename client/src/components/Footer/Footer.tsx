import React from 'react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { Footer__Container, Footer__Socials, Footer__SocialLink } from './Footer.styles';

const Footer = ({
  lastFocusableElement,
}: {
  lastFocusableElement: React.MutableRefObject<any>;
}) => {
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
          ref={lastFocusableElement}
        >
          <AiFillLinkedin />
        </Footer__SocialLink>
      </Footer__Socials>
      <p>
        Developed by <br />
        <span>Pistol Alexandru Daniel</span>
      </p>
    </Footer__Container>
  );
};

export default Footer;
