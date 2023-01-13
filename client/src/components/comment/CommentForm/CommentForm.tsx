import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { disableKeyBinds, enableKeyBinds } from '../../../app/features/videoSlice';
import { RootState } from '../../../app/store';
import AutoResizingTextarea from '../../../ui/AutoResizeTextarea';
import { Button } from '../../../ui/Button';
import ProfileImage from '../../../ui/ProfileImage';
import FocusTrapRedirectFocus from '../../focusTrap';

import {
  CommentFormBody,
  CommentFormButtons,
  CommentFormContainer,
  CommentFormProfilePicture,
} from './CommentForm.styles';

const CommentForm = ({
  value,
  setValue,
  func,
  toggle,
  redirectToElement,
  isLoading,
  autoFocus,
  btnName,
  placeholder,
  withTrap,
  error,
}: {
  value: string;
  setValue: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  func: () => void;
  toggle?: () => void;
  redirectToElement?: React.RefObject<HTMLButtonElement>;
  isLoading: boolean;
  btnName: string;
  placeholder: string;
  autoFocus?: boolean;
  withTrap?: boolean;
  error: string | undefined;
}) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const firstFocusableElement = useRef<HTMLButtonElement>(null);
  const lastFocusableElement = useRef<HTMLButtonElement>(null);

  const handleRedirectTo = () => {
    if (toggle !== undefined) {
      toggle();
    }
    if (redirectToElement !== undefined) {
      setTimeout(() => {
        redirectToElement.current?.focus();
      }, 5);
    }
  };

  return (
    <CommentFormContainer>
      {withTrap && <FocusTrapRedirectFocus element={lastFocusableElement} />}
      <CommentFormProfilePicture>
        <ProfileImage
          width={40}
          height={40}
          username={user.username}
          elemRef={firstFocusableElement}
          imageUrl={user.profile_picture}
        />
      </CommentFormProfilePicture>
      <CommentFormBody>
        <AutoResizingTextarea
          label={'Write a comment'}
          error={error ? error : undefined}
          value={value}
          setValue={setValue}
          placeholder={placeholder}
          onFocus={() => dispatch(disableKeyBinds())}
          onBlur={() => dispatch(enableKeyBinds())}
          autoFocus={autoFocus}
          hideLabel
        />
        <CommentFormButtons>
          {toggle && (
            <Button variant="normal" onClick={handleRedirectTo}>
              Cancel
            </Button>
          )}
          <Button variant="primary" onClick={func} ref={lastFocusableElement}>
            {btnName}
          </Button>
        </CommentFormButtons>
      </CommentFormBody>
      {withTrap && <FocusTrapRedirectFocus element={firstFocusableElement} />}
    </CommentFormContainer>
  );
};

export default CommentForm;
