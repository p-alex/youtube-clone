import React from 'react';
import { CloseSearchBtn, Container, MobileSearch, MobileSearchForm } from './style';
import { MdArrowBack, MdSearch } from 'react-icons/md';
import { Button } from '../../../ui/Button';
import { useDispatch } from 'react-redux';
import { disableKeyBinds, enableKeyBinds } from '../../../app/features/videoSlice';
import router from 'next/router';

const MobileSearchBar = ({
  handleToggleMobileSearch,
  searchQuery,
  setSearchQuery,
}: {
  handleToggleMobileSearch: () => void;
  searchQuery: string;
  setSearchQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const dispatch = useDispatch();
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`/search/${searchQuery}`);
  };
  return (
    <Container>
      <CloseSearchBtn>
        <MdArrowBack onClick={handleToggleMobileSearch} />
      </CloseSearchBtn>
      <MobileSearchForm>
        <MobileSearch
          placeholder="Search"
          value={searchQuery}
          onChange={setSearchQuery}
          onFocus={() => dispatch(disableKeyBinds())}
          onBlur={() => dispatch(enableKeyBinds())}
          autoFocus
        />
        <Button variant="normal" onClick={handleSearch}>
          <MdSearch />
        </Button>
      </MobileSearchForm>
    </Container>
  );
};

export default MobileSearchBar;
