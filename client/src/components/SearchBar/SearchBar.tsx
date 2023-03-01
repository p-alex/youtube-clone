import { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { disableKeyBinds, enableKeyBinds } from '../../app/features/videoSlice';
import { Search, SearchBtn, SearchForm } from './SearchBar.styles';
import router from 'next/router';
import { changeSearchQuery } from '../../app/features/navBarSlice';

const SearchBar = ({
  isMobile,
  autoFocus,
  lastFocusableElement,
}: {
  isMobile: boolean;
  autoFocus?: boolean;
  lastFocusableElement?: React.RefObject<HTMLButtonElement>;
}) => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (!searchQuery) return;
    dispatch(changeSearchQuery({ searchQuery }));
    router.push(`/search`);
  };

  return (
    <SearchForm isMobile={isMobile} onSubmit={handleSearch}>
      <Search
        placeholder="Search"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        onFocus={() => dispatch(disableKeyBinds())}
        onBlur={() => dispatch(enableKeyBinds())}
        autoComplete="true"
        autoFocus={autoFocus}
      />
      <SearchBtn ref={lastFocusableElement} aria-label="search" type="submit">
        <MdSearch />
      </SearchBtn>
    </SearchForm>
  );
};

export default SearchBar;
