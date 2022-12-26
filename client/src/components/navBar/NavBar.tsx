import React, { useRef, useState } from 'react';
import {
  NavAddVideoBtn,
  NavBtnContainer,
  NavContainer,
  NavMobileSearchBtn,
  NavProfileBtn,
  NavToggleAndLogoContainer,
  NavToggleSideBar,
} from './style';
import { BiMenu } from 'react-icons/bi';
import { MdOutlineVideoCall, MdSearch } from 'react-icons/md';
import Image from 'next/image';
import Logo from '../logo/Logo';
import NavSideBar from '../navSideBar/NavSideBar';
import { AnimatePresence } from 'framer-motion';
import MobileSearchBar from '../SearchBar/MobileSearchBar/MobileSearchBar';
import useAuth from '../../hooks/authHooks/useAuth';
import UploadModal from '../uploadModal/UploadModal';
import { ProfileDropDown } from '../profileDropDown/ProfileDropDown';
import SearchBar from '../SearchBar/SearchBar';
import { Button } from '../../ui/Button';
import Link from 'next/link';

const NavBar = () => {
  const { isAuth, user } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSetSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const [isSideBarActive, setIsSideBarActive] = useState(false);

  const [isProfileDropDownActive, setIsProfileDropDownActive] = useState(false);

  const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);

  const [isUploadModalActive, setIsUploadModalActive] = useState(false);

  const uploadModalToggleRef = useRef<HTMLButtonElement>(null);
  const navToggleRef = useRef<HTMLButtonElement>(null);

  const handleToggleSideBar = () => {
    setIsSideBarActive((prevState) => !prevState);
    navToggleRef.current?.focus();
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
        <MobileSearchBar
          handleToggleMobileSearch={handleToggleMobileSearch}
          searchQuery={searchQuery}
          setSearchQuery={handleSetSearchQuery}
        />
      )}
      <NavContainer>
        <NavToggleAndLogoContainer>
          <NavToggleSideBar
            onClick={handleToggleSideBar}
            ref={navToggleRef}
            aria-label="Toggle side bar"
          >
            <BiMenu />
          </NavToggleSideBar>
          <Logo />
        </NavToggleAndLogoContainer>

        <SearchBar searchQuery={searchQuery} setSearchQuery={handleSetSearchQuery} />

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

          {!isAuth && (
            <Link href="/signin">
              <Button variant="primary">login</Button>
            </Link>
          )}
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
