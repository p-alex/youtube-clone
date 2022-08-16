import React, { useState } from 'react';
import {
  NavAddVideoBtn,
  NavBtnContainer,
  NavContainer,
  NavMobileSearchBtn,
  NavProfileBtn,
  NavSearch,
  NavSearchBtn,
  NavSearchForm,
  NavToggleAndLogoContainer,
  NavToggleSideBar,
} from './style';
import MenuIcon from '@mui/icons-material/Menu';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';
import Logo from '../logo/Logo';
import NavSideBar from '../navSideBar/NavSideBar';
import { AnimatePresence } from 'framer-motion';
import NavMobileSearch from '../navMobileSearch/NavMobileSeach';
import SignInButton from '../../ui/SignInButton';
import useAuth from '../../hooks/useAuth';
import LogoutBtn from '../logoutBtn/LogoutBtn';
import UploadModal from '../uploadModal/UploadModal';

const NavBar = () => {
  const { isAuth, user } = useAuth();
  const [isSideBarActive, setIsSideBarActive] = useState(false);

  const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);

  const [isUploadModalActive, setIsUploadModalActive] = useState(false);

  const handleToggleSideBar = () => {
    setIsSideBarActive((prevState) => !prevState);
  };

  const handleToggleMobileSearch = () => {
    setIsMobileSearchActive((prevState) => !prevState);
  };

  const handleToggleUploadModal = () => {
    setIsUploadModalActive((prevState) => !prevState);
  };

  return (
    <>
      {isMobileSearchActive && (
        <NavMobileSearch handleToggleMobileSearch={handleToggleMobileSearch} />
      )}
      <NavContainer>
        <NavToggleAndLogoContainer>
          <NavToggleSideBar onClick={handleToggleSideBar}>
            <MenuIcon />
          </NavToggleSideBar>
          <Logo />
        </NavToggleAndLogoContainer>

        <NavSearchForm>
          <NavSearch placeholder="Search" />
          <NavSearchBtn>
            <SearchIcon />
          </NavSearchBtn>
        </NavSearchForm>

        <NavBtnContainer>
          <NavMobileSearchBtn
            aria-label="Search"
            onClick={() => setIsMobileSearchActive((prevState) => !prevState)}
          >
            <SearchIcon />
          </NavMobileSearchBtn>

          {isAuth && (
            <>
              <NavAddVideoBtn
                aria-label="Upload a video"
                onClick={handleToggleUploadModal}
              >
                <VideoCallOutlinedIcon />
              </NavAddVideoBtn>
              <NavProfileBtn aria-label="Go to profile">
                <Image
                  src={user ? user.profile_picture : '/images/profile_picture.jpg'}
                  width={32}
                  height={32}
                  alt=""
                />
              </NavProfileBtn>
            </>
          )}

          {!isAuth && <SignInButton />}
          {isAuth && <LogoutBtn />}
        </NavBtnContainer>
      </NavContainer>
      <AnimatePresence>
        {isSideBarActive && <NavSideBar handleToggleSideBar={handleToggleSideBar} />}
        {isUploadModalActive && (
          <UploadModal handleToggleUploadModal={handleToggleUploadModal} />
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
