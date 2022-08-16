import React from 'react';
import {
  CloseSearchBtn,
  Container,
  NavMobileSearch,
  NavMobileSearchBtn,
  NavMobileSearchForm,
} from './style';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';

const NavMobileSeach = ({
  handleToggleMobileSearch,
}: {
  handleToggleMobileSearch: () => void;
}) => {
  return (
    <Container>
      <CloseSearchBtn>
        <ArrowBackIcon onClick={handleToggleMobileSearch} />
      </CloseSearchBtn>
      <NavMobileSearchForm>
        <NavMobileSearch placeholder="Search" autoFocus />
        <NavMobileSearchBtn>
          <SearchIcon />
        </NavMobileSearchBtn>
      </NavMobileSearchForm>
    </Container>
  );
};

export default NavMobileSeach;
