import React, { useRef } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../logo/Logo';
import HomeIcon from '@mui/icons-material/Home';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../app/features/themeSlice';
import {
  LoginContainer,
  LoginTitle,
  NavSideBar_Backdrop,
  NavSideBar_Button,
  NavSideBar_ButtonItem,
  NavSideBar_ButtonLink,
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

const NavSideBar = ({ handleToggleSideBar }: { handleToggleSideBar: () => void }) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
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
            <MenuIcon />
          </NavSideBar_CloseBtn>
          <Logo />
        </NavSideBar_Header>
        <NavSideBar_ButtonList>
          <NavSideBar_ButtonItem>
            <Link href={'/'}>
              <a>
                <NavSideBar_ButtonLink>
                  <HomeIcon /> Home
                </NavSideBar_ButtonLink>
              </a>
            </Link>
          </NavSideBar_ButtonItem>

          {isAuth && (
            <>
              <NavSideBar_ButtonItem>
                <Link href={'/'}>
                  <a>
                    <NavSideBar_ButtonLink>
                      <SubscriptionsIcon /> Subscriptions
                    </NavSideBar_ButtonLink>
                  </a>
                </Link>
              </NavSideBar_ButtonItem>

              <NavSideBar_HorizontalLine />

              <NavSideBar_ButtonItem>
                <Link href={'/'}>
                  <a>
                    <NavSideBar_ButtonLink>
                      <VideoLibraryIcon /> Library
                    </NavSideBar_ButtonLink>
                  </a>
                </Link>
              </NavSideBar_ButtonItem>
            </>
          )}

          <NavSideBar_HorizontalLine />

          {!isAuth && (
            <>
              <LoginContainer>
                <LoginTitle>Sign in to like videos, comment, and subscribe.</LoginTitle>
                <SignInButton />
              </LoginContainer>
              <NavSideBar_HorizontalLine />
            </>
          )}

          <NavSideBar_ButtonItem>
            <NavSideBar_Button
              onClick={() => dispatch(toggleTheme())}
              ref={lastFocusableElement}
            >
              {theme === 'dark' ? (
                <>
                  <LightModeIcon /> Light Mode
                </>
              ) : (
                <>
                  <DarkModeIcon /> Dark Mode
                </>
              )}
            </NavSideBar_Button>
          </NavSideBar_ButtonItem>
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
