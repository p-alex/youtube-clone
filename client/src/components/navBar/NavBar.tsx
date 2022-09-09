import React, { useRef, useState } from 'react';
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
import { BiMenu } from 'react-icons/bi';
import { MdOutlineVideoCall, MdSearch } from 'react-icons/md';
import Image from 'next/image';
import Logo from '../logo/Logo';
import NavSideBar from '../navSideBar/NavSideBar';
import { AnimatePresence } from 'framer-motion';
import NavMobileSearch from '../navMobileSearch/NavMobileSeach';
import SignInButton from '../../ui/SignInButton';
import useAuth from '../../hooks/useAuth';
import UploadModal from '../uploadModal/UploadModal';
import { useDispatch } from 'react-redux';
import { disableKeyBinds, enableKeyBinds } from '../../app/features/videoSlice';
import { ProfileDropDown } from '../profileDropDown/ProfileDropDown';

const NavBar = () => {
  const { isAuth, user } = useAuth();
  const dispatch = useDispatch();
  const [isSideBarActive, setIsSideBarActive] = useState(false);

  const [isProfileDropDownActive, setIsProfileDropDownActive] = useState(false);

  const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);

  const [isUploadModalActive, setIsUploadModalActive] = useState(false);

  const uploadModalToggleRef = useRef<any>();
  const modelToggleRef = useRef<any>();

  const handleToggleSideBar = () => {
    setIsSideBarActive((prevState) => !prevState);
    modelToggleRef.current?.focus();
  };

  const handleToggleMobileSearch = () => {
    setIsMobileSearchActive((prevState) => !prevState);
  };

  const handleToggleUploadModal = () => {
    setIsUploadModalActive((prevState) => !prevState);
    uploadModalToggleRef.current?.focus();
  };

  return (
    <>
      {isMobileSearchActive && (
        <NavMobileSearch handleToggleMobileSearch={handleToggleMobileSearch} />
      )}
      <NavContainer>
        <NavToggleAndLogoContainer>
          <NavToggleSideBar
            onClick={handleToggleSideBar}
            ref={modelToggleRef}
            aria-label="Toggle side bar"
          >
            <BiMenu />
          </NavToggleSideBar>
          <Logo />
        </NavToggleAndLogoContainer>

        <NavSearchForm>
          <NavSearch
            placeholder="Search"
            onFocus={() => dispatch(disableKeyBinds())}
            onBlur={() => dispatch(enableKeyBinds())}
          />
          <NavSearchBtn>
            <MdSearch />
          </NavSearchBtn>
        </NavSearchForm>

        <NavBtnContainer>
          <NavMobileSearchBtn
            aria-label="Search"
            onClick={() => setIsMobileSearchActive((prevState) => !prevState)}
          >
            <MdSearch />
          </NavMobileSearchBtn>

          {isAuth && (
            <>
              <NavAddVideoBtn
                aria-label="Upload a video"
                onClick={handleToggleUploadModal}
                ref={uploadModalToggleRef}
              >
                <MdOutlineVideoCall />
              </NavAddVideoBtn>
              <NavProfileBtn
                aria-label="Go to profile"
                onClick={() => setIsProfileDropDownActive((prevState) => !prevState)}
              >
                <Image
                  src={user ? user.profile_picture : '/images/default-profile-picture'}
                  width={32}
                  height={32}
                  alt=""
                />
              </NavProfileBtn>
              <AnimatePresence>
                {isProfileDropDownActive && <ProfileDropDown />}
              </AnimatePresence>
            </>
          )}

          {!isAuth && <SignInButton />}
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
