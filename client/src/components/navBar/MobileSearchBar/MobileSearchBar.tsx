import { useRef } from 'react';
import SearchBar from '../../SearchBar/SearchBar';
import { MdArrowBack } from 'react-icons/md';
import {
  MobileSearchBar__CloseBtn,
  MobileSearchBar__Container,
} from './MobileSearchBar.styles';
import FocusTrapRedirectFocus from '../../focusTrap';

interface Props {
  handleClose: () => void;
}

const MobileSearchBar = ({ handleClose }: Props) => {
  const handleCloseMobileSearch = () => {
    handleClose();
    document.getElementById('nav-bar-search-btn-toggle')?.focus();
  };
  const firstFocusableElement = useRef<HTMLButtonElement>(null);
  const lastFocusableElement = useRef<HTMLButtonElement>(null);
  return (
    <MobileSearchBar__Container>
      <FocusTrapRedirectFocus element={lastFocusableElement} />
      <MobileSearchBar__CloseBtn
        onClick={handleCloseMobileSearch}
        ref={firstFocusableElement}
        aria-label="Close mobile search"
      >
        <MdArrowBack />
      </MobileSearchBar__CloseBtn>
      <SearchBar isMobile={true} autoFocus lastFocusableElement={lastFocusableElement} />
      <FocusTrapRedirectFocus element={firstFocusableElement} />
    </MobileSearchBar__Container>
  );
};

export default MobileSearchBar;
