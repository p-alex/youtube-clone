import React, { useRef } from 'react';
import { MdMenu, MdHome, MdSubscriptions, MdVideoLibrary } from 'react-icons/md';
import Logo from '../Logo/Logo';
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
} from './NavSideBar.styles';
import useAuth from '../../hooks/authHooks/useAuth';
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
              <ListButton>
                <MdHome /> Home
              </ListButton>
            </Link>
          </NavSideBar_ButtonItem>

          {isAuth && (
            <>
              <NavSideBar_ButtonItem>
                <Link href={'/subscriptions'}>
                  <ListButton>
                    <MdSubscriptions /> Subscriptions
                  </ListButton>
                </Link>
              </NavSideBar_ButtonItem>
            </>
          )}

          {!isAuth && (
            <>
              <NavSideBar_HorizontalLine />
              <LoginContainer>
                <LoginTitle>Login to like videos, comment, and subscribe.</LoginTitle>
                <Link href="/signin">
                  <Button variant="primary" ref={lastFocusableElement}>
                    login
                  </Button>
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
