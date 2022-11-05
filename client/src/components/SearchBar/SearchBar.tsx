import React from 'react';
import { MdSearch } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { disableKeyBinds, enableKeyBinds } from '../../app/features/videoSlice';
import { Search, SearchBtn, SearchForm } from './SearchBar.styles';
import router from 'next/router';

const SearchBar = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const dispatch = useDispatch();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`/search/${searchQuery}`);
  };

  return (
    <SearchForm>
      <Search
        placeholder="Search"
        value={searchQuery}
        onChange={setSearchQuery}
        onFocus={() => dispatch(disableKeyBinds())}
        onBlur={() => dispatch(enableKeyBinds())}
      />
      <SearchBtn onClick={handleSearch}>
        <MdSearch />
      </SearchBtn>
    </SearchForm>
  );
};

export default SearchBar;
