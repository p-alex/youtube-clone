import React from 'react';
import {
  CloseSearchBtn,
  Container,
  NavMobileSearch,
  NavMobileSearchBtn,
  NavMobileSearchForm,
} from './style';
import { MdArrowBack, MdSearch } from 'react-icons/md';

const NavMobileSeach = ({
  handleToggleMobileSearch,
}: {
  handleToggleMobileSearch: () => void;
}) => {
  return (
    <Container>
      <CloseSearchBtn>
        <MdArrowBack onClick={handleToggleMobileSearch} />
      </CloseSearchBtn>
      <NavMobileSearchForm>
        <NavMobileSearch placeholder="Search" autoFocus />
        <NavMobileSearchBtn>
          <MdSearch />
        </NavMobileSearchBtn>
      </NavMobileSearchForm>
    </Container>
  );
};

export default NavMobileSeach;
