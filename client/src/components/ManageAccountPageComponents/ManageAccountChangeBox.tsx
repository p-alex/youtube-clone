import { useRef } from 'react';
import { useRouter } from 'next/router';
import ManageUsernameForm from './ManageAccountForms/ManageUsernameForm';
import FocusTrapRedirectFocus from '../focusTrap';
import ManageProfilePictureForm from './ManageAccountForms/ManageProfilePictureForm';
import ManageProfilePasswordForm from './ManageAccountForms/ManageProfilePasswordForm';
import { MdClose } from 'react-icons/md';
import useDisableScroll from '../../hooks/useDisableScroll';
import {
  ManageAccountChangeBox__BackBtn,
  ManageAccountChangeBox__Backdrop,
  ManageAccountChangeBox__Container,
  ManageAccountChangeBox__FormContainer,
  ManageAccountChangeBox__Header,
  ManageAccountChangeBox__Title,
  ManageAccountChangeBox__Wrapper,
} from './ManageAccountChangeBox.styles';

const ManageAccountChangeBox = ({
  lastFocusedElement,
}: {
  lastFocusedElement: HTMLButtonElement | null;
}) => {
  const router = useRouter();
  const changeParam = router.query.change as string;

  const firstFocusableElement = useRef<HTMLButtonElement>(null);
  const lastFocusableElement = useRef<HTMLButtonElement>(null);

  const handleCloseBox = () => {
    router.push('/manage/account');
    lastFocusedElement?.focus();
  };

  useDisableScroll();

  return (
    <ManageAccountChangeBox__Wrapper>
      <ManageAccountChangeBox__Backdrop onClick={handleCloseBox} />
      <ManageAccountChangeBox__Container>
        <FocusTrapRedirectFocus element={lastFocusableElement} />

        <ManageAccountChangeBox__Header>
          <ManageAccountChangeBox__Title>{changeParam}</ManageAccountChangeBox__Title>
          <ManageAccountChangeBox__BackBtn
            type="button"
            onClick={handleCloseBox}
            ref={firstFocusableElement}
            aria-label={'Go back'}
          >
            <MdClose />
          </ManageAccountChangeBox__BackBtn>
        </ManageAccountChangeBox__Header>

        <ManageAccountChangeBox__FormContainer>
          {changeParam === 'Username' && (
            <ManageUsernameForm lastFocusableElement={lastFocusableElement} />
          )}
          {changeParam === 'Profile picture' && (
            <ManageProfilePictureForm lastFocusableElement={lastFocusableElement} />
          )}
          {changeParam === 'Password' && (
            <ManageProfilePasswordForm lastFocusableElement={lastFocusableElement} />
          )}
        </ManageAccountChangeBox__FormContainer>

        <FocusTrapRedirectFocus element={firstFocusableElement} />
      </ManageAccountChangeBox__Container>
    </ManageAccountChangeBox__Wrapper>
  );
};

export default ManageAccountChangeBox;
