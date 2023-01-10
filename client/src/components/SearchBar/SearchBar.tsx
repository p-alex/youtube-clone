import React from 'react';
import { MdSearch } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { disableKeyBinds, enableKeyBinds } from '../../app/features/videoSlice';
import { Search, SearchBtn, SearchForm } from './SearchBar.styles';
import router from 'next/router';

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  isMobile,
  autoFocus,
  lastFocusableElement,
}: {
  searchQuery: string;
  setSearchQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isMobile: boolean;
  autoFocus?: boolean;
  lastFocusableElement?: React.RefObject<HTMLButtonElement>;
}) => {
  const dispatch = useDispatch();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`/search/${searchQuery}`);
  };

  return (
    <SearchForm isMobile={isMobile}>
      <Search
        placeholder="Search"
        value={searchQuery}
        onChange={setSearchQuery}
        onFocus={() => dispatch(disableKeyBinds())}
        onBlur={() => dispatch(enableKeyBinds())}
        autoComplete="true"
        autoFocus={autoFocus}
      />
      <SearchBtn onClick={handleSearch} ref={lastFocusableElement} aria-label="search">
        <MdSearch />
      </SearchBtn>
    </SearchForm>
  );
};

export default SearchBar;
