import React from 'react';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../logo/Logo';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
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
} from './NavSideBar.styled';

const NavSideBar = ({ handleToggleSideBar }: { handleToggleSideBar: () => void }) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  return (
    <NavSideBar_Wrapper>
      <NavSideBar_Container
        as={motion.div}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'just' }}
        exit={{ x: -100, opacity: 0 }}
      >
        <NavSideBar_Header>
          <NavSideBar_CloseBtn onClick={handleToggleSideBar}>
            <MenuIcon />
          </NavSideBar_CloseBtn>
          <Link href={'/'}>
            <Logo />
          </Link>
        </NavSideBar_Header>
        <NavSideBar_ButtonList>
          <NavSideBar_ButtonItem>
            <Link href={'/'}>
              <NavSideBar_ButtonLink>
                <HomeIcon /> Home
              </NavSideBar_ButtonLink>
            </Link>
          </NavSideBar_ButtonItem>

          <NavSideBar_ButtonItem>
            <NavSideBar_ButtonLink>
              <ExploreIcon /> Explore
            </NavSideBar_ButtonLink>
          </NavSideBar_ButtonItem>

          <NavSideBar_ButtonItem>
            <NavSideBar_ButtonLink>
              <SubscriptionsIcon /> Subscriptions
            </NavSideBar_ButtonLink>
          </NavSideBar_ButtonItem>

          <NavSideBar_HorizontalLine />

          <NavSideBar_ButtonItem>
            <NavSideBar_ButtonLink>
              <VideoLibraryIcon /> Library
            </NavSideBar_ButtonLink>
          </NavSideBar_ButtonItem>

          <NavSideBar_HorizontalLine />

          <NavSideBar_ButtonItem>
            <NavSideBar_Button onClick={() => dispatch(toggleTheme())}>
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
    </NavSideBar_Wrapper>
  );
};

export default NavSideBar;
