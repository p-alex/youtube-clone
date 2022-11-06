import React, { useRef } from 'react';
import { MdMenu, MdHome, MdSubscriptions, MdVideoLibrary } from 'react-icons/md';
import Logo from '../logo/Logo';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LoginContainer,
  LoginTitle,
  NavSideBar_Backdrop,
  NavSideBar_ButtonItem,
  NavSideBar_ButtonList,
  NavSideBar_CloseBtn,
  NavSideBar_Container,
  NavSideBar_Header,
  NavSideBar_HorizontalLine,
  NavSideBar_Wrapper,
} from './style';
import SignInButton from '../../ui/SignInButton';
import useAuth from '../../hooks/useAuth';
import useDisableScroll from '../../hooks/useDisableScroll';
import FocusTrapRedirectFocus from '../focusTrap';
import { ListButton } from '../../ui/ListButton';
import { Button } from '../../ui/Button';

const NavSideBar = ({ handleToggleSideBar }: { handleToggleSideBar: () => void }) => {
  const { isAuth } = useAuth();
  useDisableScroll();
  const firstFocusableElement = useRef<any>();
  const lastFocusableElement = useRef<any>();
  return (
    <NavSideBar_Wrapper>
      <FocusTrapRedirectFocus element={lastFocusableElement} />
      <NavSideBar_Container
        as={motion.div}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'just' }}
        exit={{ x: -100, opacity: 0 }}
      >
        <NavSideBar_Header>
          <NavSideBar_CloseBtn
            onClick={handleToggleSideBar}
            ref={firstFocusableElement}
            aria-label={'Close side bar'}
            autoFocus={true}
          >
            <MdMenu />
          </NavSideBar_CloseBtn>
          <Logo />
        </NavSideBar_Header>
        <NavSideBar_ButtonList>
          <NavSideBar_ButtonItem>
            <Link href={'/'}>
              <a>
                <ListButton>
                  <MdHome /> Home
                </ListButton>
              </a>
            </Link>
          </NavSideBar_ButtonItem>

          {isAuth && (
            <>
              <NavSideBar_ButtonItem>
                <Link href={'/'}>
                  <a>
                    <ListButton>
                      <MdSubscriptions /> Subscriptions
                    </ListButton>
                  </a>
                </Link>
              </NavSideBar_ButtonItem>

              <NavSideBar_HorizontalLine />

              <NavSideBar_ButtonItem>
                <Link href={'/'}>
                  <a>
                    <ListButton>
                      <MdVideoLibrary /> Library
                    </ListButton>
                  </a>
                </Link>
              </NavSideBar_ButtonItem>
            </>
          )}

          {!isAuth && (
            <>
              <NavSideBar_HorizontalLine />
              <LoginContainer>
                <LoginTitle>Sign in to like videos, comment, and subscribe.</LoginTitle>
                <Link href="/signin">
                  <Button variant="primary">Sign in</Button>
                </Link>
              </LoginContainer>
              <NavSideBar_HorizontalLine />
            </>
          )}
        </NavSideBar_ButtonList>
      </NavSideBar_Container>
      <NavSideBar_Backdrop
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'just' }}
        exit={{ opacity: 0 }}
        onClick={handleToggleSideBar}
      />
      <FocusTrapRedirectFocus element={firstFocusableElement} />
    </NavSideBar_Wrapper>
  );
};

export default NavSideBar;
