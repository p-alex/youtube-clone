import React from 'react';
import { MdSearch } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { disableKeyBinds, enableKeyBinds } from '../../app/features/videoSlice';
import { Button } from '../../ui/Button';
import { Search, SearchForm } from './SearchBar.styles';
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
      <Button variant={'normal'} onClick={handleSearch}>
        <MdSearch />
      </Button>
    </SearchForm>
  );
};

export default SearchBar;
