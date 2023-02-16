import React, { useEffect, useRef } from 'react';
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
import Logo from '../../ui/Logo/Logo';
import NavSideBar from '../NavSideBar/NavSideBar';
import { AnimatePresence } from 'framer-motion';
import useAuth from '../../hooks/authHooks/useAuth';
import UploadModal from '../Modals/UploadModal/UploadModal';
import { ProfileDropDown } from '../ProfileDropDown/ProfileDropDown';
import SearchBar from '../SearchBar/SearchBar';
import { Button } from '../../ui/Button';
import Link from 'next/link';
import MobileSearchBar from './MobileSearchBar/MobileSearchBar';
import { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeSearchQuery,
  NavBarActiveTab,
  setNavActiveTab,
} from '../../app/features/navBarSlice';

const NavBar = () => {
  const { isAuth, user } = useAuth();

  const dispatch = useDispatch();
  const { searchQuery, activeTab } = useSelector((state: RootState) => state.navbar);

  const handleSetSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchQuery({ searchQuery: event.target.value }));
  };

  const handleChangeActiveTab = (tab: NavBarActiveTab) => {
    dispatch(setNavActiveTab({ tab }));
  };

  const uploadModalToggleRef = useRef<HTMLButtonElement>(null);
  const navToggleRef = useRef<HTMLButtonElement>(null);

  const handleToggleSideBar = () => {
    dispatch(setNavActiveTab({ tab: '' }));
    navToggleRef.current?.focus();
  };

  const handleToggleMobileSearch = () => {
    dispatch(setNavActiveTab({ tab: '' }));
  };

  const handleToggleUploadModal = () => {
    dispatch(setNavActiveTab({ tab: '' }));
    uploadModalToggleRef.current?.focus();
  };

  useEffect(() => {
    return () => {
      dispatch(setNavActiveTab({ tab: '' }));
    };
  }, []);

  return (
    <>
      {activeTab === 'mobile-search' && (
        <MobileSearchBar
          handleClose={handleToggleMobileSearch}
          searchQuery={searchQuery}
          setSearchQuery={handleSetSearchQuery}
        />
      )}
      <NavBar__Container>
        <NavBar__ToggleAndLogoContainer>
          <NavBar__ToggleBtn
            onClick={() => handleChangeActiveTab('sidebar')}
            ref={navToggleRef}
            aria-label="Toggle side bar"
          >
            <BiMenu />
          </NavBar__ToggleBtn>
          <Logo />
        </NavBar__ToggleAndLogoContainer>

        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={handleSetSearchQuery}
          isMobile={false}
        />

        <NavBar__BtnContainer>
          <NavBar__MobileSearchBtn
            aria-label="Search"
            onClick={() => handleChangeActiveTab('mobile-search')}
            id={'nav-bar-search-btn-toggle'}
          >
            <MdSearch />
          </NavBar__MobileSearchBtn>

          {isAuth && (
            <>
              <NavBar__AddVideoBtn
                aria-label="Upload a video"
                onClick={() => handleChangeActiveTab('upload-modal')}
                ref={uploadModalToggleRef}
              >
                <MdOutlineVideoCall />
              </NavBar__AddVideoBtn>
              <NavBar__ProfileBtn
                aria-label="Go to profile"
                onClick={() => handleChangeActiveTab('profile-drop-down')}
              >
                <Image
                  src={user ? user.profile_picture : '/images/default-profile-picture'}
                  width={32}
                  height={32}
                  alt=""
                />
              </NavBar__ProfileBtn>
              <AnimatePresence>
                {activeTab === 'profile-drop-down' && <ProfileDropDown />}
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
        {activeTab === 'sidebar' && (
          <NavSideBar handleToggleSideBar={handleToggleSideBar} />
        )}
        {activeTab === 'upload-modal' && (
          <UploadModal handleToggleUploadModal={handleToggleUploadModal} />
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
