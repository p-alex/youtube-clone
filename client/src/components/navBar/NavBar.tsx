import React, { useRef, useState } from 'react';
import {
  NavBar__AddVideoBtn,
  NavBar__BtnContainer,
  NavBar__Container,
  NavBar__MobileSearchBtn,
  NavBar__ProfileBtn,
  NavBar__ToggleAndLogoContainer,
  NavBar__ToggleBtn,
} from './NavBar.styles';
import { BiMenu } from 'react-icons/bi';
import { MdOutlineVideoCall, MdSearch } from 'react-icons/md';
import Image from 'next/image';
import Logo from '../Logo/Logo';
import NavSideBar from '../NavSideBar/NavSideBar';
import { AnimatePresence } from 'framer-motion';
import MobileSearchBar from '../SearchBar/MobileSearchBar/MobileSearchBar';
import useAuth from '../../hooks/authHooks/useAuth';
import UploadModal from '../UploadModal/UploadModal';
import { ProfileDropDown } from '../ProfileDropDown/ProfileDropDown';
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
      <NavBar__Container>
        <NavBar__ToggleAndLogoContainer>
          <NavBar__ToggleBtn
            onClick={handleToggleSideBar}
            ref={navToggleRef}
            aria-label="Toggle side bar"
          >
            <BiMenu />
          </NavBar__ToggleBtn>
          <Logo />
        </NavBar__ToggleAndLogoContainer>

        <SearchBar searchQuery={searchQuery} setSearchQuery={handleSetSearchQuery} />

        <NavBar__BtnContainer>
          <NavBar__MobileSearchBtn
            aria-label="Search"
            onClick={() => setIsMobileSearchActive((prevState) => !prevState)}
          >
            <MdSearch />
          </NavBar__MobileSearchBtn>

          {isAuth && (
            <>
              <NavBar__AddVideoBtn
                aria-label="Upload a video"
                onClick={handleToggleUploadModal}
                ref={uploadModalToggleRef}
              >
                <MdOutlineVideoCall />
              </NavBar__AddVideoBtn>
              <NavBar__ProfileBtn
                aria-label="Go to profile"
                onClick={() => setIsProfileDropDownActive((prevState) => !prevState)}
              >
                <Image
                  src={user ? user.profile_picture : '/images/default-profile-picture'}
                  width={32}
                  height={32}
                  alt=""
                />
              </NavBar__ProfileBtn>
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
        </NavBar__BtnContainer>
      </NavBar__Container>
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
