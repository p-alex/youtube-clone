import Link from 'next/link';
import React, { useState } from 'react';
import {
  NavAddVideoBtn,
  NavBtnContainer,
  NavContainer,
  NavProfileBtn,
  NavSearch,
  NavSearchBtn,
  NavSearchForm,
  NavToggleAndLogoContainer,
  NavToggleSideBar,
} from './NavBar.styled';
import MenuIcon from '@mui/icons-material/Menu';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';
import Logo from '../logo/Logo';
import NavSideBar from '../navSideBar/NavSideBar';
import { AnimatePresence } from 'framer-motion';

const NavBar = () => {
  const [isSideBarActive, setIsSideBarActive] = useState(false);

  const handleToggleSideBar = () => {
    setIsSideBarActive((prevState) => !prevState);
  };

  return (
    <>
      <NavContainer>
        <NavToggleAndLogoContainer>
          <NavToggleSideBar onClick={handleToggleSideBar}>
            <MenuIcon />
          </NavToggleSideBar>
          <Link href={'/'}>
            <Logo />
          </Link>
        </NavToggleAndLogoContainer>

        <NavSearchForm>
          <NavSearch placeholder="Search" />
          <NavSearchBtn>
            <SearchIcon />
          </NavSearchBtn>
        </NavSearchForm>

        <NavBtnContainer>
          <NavAddVideoBtn>
            <VideoCallOutlinedIcon />
          </NavAddVideoBtn>

          <NavProfileBtn aria-label="Go to profile">
            <Image src="/images/profile-picture.jpg" width={32} height={32} alt="" />
          </NavProfileBtn>
        </NavBtnContainer>
      </NavContainer>

      <AnimatePresence>
        {isSideBarActive && <NavSideBar handleToggleSideBar={handleToggleSideBar} />}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
