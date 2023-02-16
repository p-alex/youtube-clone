import React, { useRef, useState } from 'react';
import { MdMenu, MdHome, MdSubscriptions, MdVideoLibrary } from 'react-icons/md';
import Logo from '../../../ui/Logo/Logo';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LoginContainer,
  LoginTitle,
  NavSideBar__Backdrop,
  NavSideBar__ButtonItem,
  NavSideBar__ButtonList,
  NavSideBar__ButtonsContainer,
  NavSideBar__CloseBtn,
  NavSideBar__Container,
  NavSideBar__Header,
  NavSideBar__HorizontalLine,
  NavSideBar__ListTitle,
  NavSideBar__Wrapper,
} from './NavSideBar.styles';
import useAuth from '../../../hooks/authHooks/useAuth';
import useDisableScroll from '../../../hooks/useDisableScroll';
import FocusTrapRedirectFocus from '../../focusTrap';
import { ListButton } from '../../../ui/ListButton';
import { Button } from '../../../ui/Button';
import Footer from '../../Footer/Footer';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import SubscriptionMiniButton from '../../../ui/SubscriptionMiniButton';

const NavSideBar = ({ handleToggleSideBar }: { handleToggleSideBar: () => void }) => {
  const { isAuth } = useAuth();
  useDisableScroll();
  const firstFocusableElement = useRef<any>();
  const lastFocusableElement = useRef<any>();

  const [showMore, setShowMore] = useState(false);

  const subscriptionsMini = useSelector(
    (state: RootState) => state.subscriptions.navSideBarMiniUsers.list
  );
  return (
    <NavSideBar__Wrapper>
      <FocusTrapRedirectFocus element={lastFocusableElement} />
      <NavSideBar__Container
        as={motion.div}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'just' }}
        exit={{ x: -100, opacity: 0 }}
      >
        <NavSideBar__Header>
          <NavSideBar__CloseBtn
            onClick={handleToggleSideBar}
            ref={firstFocusableElement}
            aria-label={'Close side bar'}
            autoFocus={true}
          >
            <MdMenu />
          </NavSideBar__CloseBtn>
          <Logo />
        </NavSideBar__Header>
        <NavSideBar__ButtonsContainer>
          <NavSideBar__ButtonList>
            <NavSideBar__ButtonItem>
              <Link href={'/'}>
                <ListButton>
                  <MdHome /> Home
                </ListButton>
              </Link>
            </NavSideBar__ButtonItem>

            {isAuth && (
              <>
                <NavSideBar__ButtonItem>
                  <Link href={'/subscriptions'}>
                    <ListButton>
                      <MdSubscriptions /> Subscriptions
                    </ListButton>
                  </Link>
                </NavSideBar__ButtonItem>
              </>
            )}

            {!isAuth && (
              <>
                <NavSideBar__HorizontalLine />
                <LoginContainer>
                  <LoginTitle>Login to like videos, comment, and subscribe.</LoginTitle>
                  <Link href="/signin">
                    <Button variant="primary" ref={lastFocusableElement}>
                      login
                    </Button>
                  </Link>
                </LoginContainer>
                <NavSideBar__HorizontalLine />
              </>
            )}
          </NavSideBar__ButtonList>

          {isAuth && (
            <NavSideBar__ButtonList>
              <NavSideBar__ListTitle>Subscriptions</NavSideBar__ListTitle>
              {subscriptionsMini &&
                subscriptionsMini.map((subscription, index) => {
                  if (!showMore) {
                    if (index === 9) return;
                  }
                  return <SubscriptionMiniButton subscription={subscription} />;
                })}
              {subscriptionsMini.length > 10 && (
                <Button
                  variant="normal"
                  onClick={() => setShowMore((prevState) => !prevState)}
                  style={{ marginLeft: '16px', marginTop: '16px' }}
                >
                  Show {showMore ? 'Less' : 'More'}
                </Button>
              )}
            </NavSideBar__ButtonList>
          )}
        </NavSideBar__ButtonsContainer>

        <Footer lastFocusableElement={lastFocusableElement} />
      </NavSideBar__Container>
      <NavSideBar__Backdrop
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'just' }}
        exit={{ opacity: 0 }}
        onClick={handleToggleSideBar}
      />
      <FocusTrapRedirectFocus element={firstFocusableElement} />
    </NavSideBar__Wrapper>
  );
};

export default NavSideBar;
