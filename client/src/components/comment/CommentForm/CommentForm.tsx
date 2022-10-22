import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { disableKeyBinds, enableKeyBinds } from '../../../app/features/videoSlice';
import { RootState } from '../../../app/store';
import AutoResizingTextarea from '../../../ui/AutoResizeTextarea';
import { Button } from '../../../ui/Button';
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
}) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const firstFocusableElement = useRef<any>(null);
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
        <Link href={'#'}>
          <a ref={firstFocusableElement}>
            <Image src={user.profile_picture} width={40} height={40} alt="" />
          </a>
        </Link>
      </CommentFormProfilePicture>
      <CommentFormBody>
        <AutoResizingTextarea
          value={value}
          onChange={setValue}
          placeholder={placeholder}
          onFocus={() => dispatch(disableKeyBinds())}
          onBlur={() => dispatch(enableKeyBinds())}
          autoFocus={autoFocus}
        />
        <CommentFormButtons>
          {toggle && (
            <Button
              variant="normal"
              onClick={handleRedirectTo}
              ref={isLoading || !value ? lastFocusableElement : null}
            >
              Cancel
            </Button>
          )}
          <Button
            variant="primary"
            onClick={func}
            ref={isLoading || !value ? null : lastFocusableElement}
            disabled={isLoading || !value}
          >
            {btnName}
          </Button>
        </CommentFormButtons>
      </CommentFormBody>
      {withTrap && <FocusTrapRedirectFocus element={firstFocusableElement} />}
    </CommentFormContainer>
  );
};

export default CommentForm;
