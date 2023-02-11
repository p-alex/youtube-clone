import { ChangeEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';
import { disableKeyBinds, enableKeyBinds } from '../../../app/features/videoSlice';
import { RootState } from '../../../app/store';
import useZodVerifySchema from '../../../hooks/useZodVerifySchema';
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

interface Props {
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
}

const CommentFormSchema = z
  .object({
    text: z.string({}).min(1, "Can't be blank."),
    initialText: z.string({}),
  })
  .refine((current) => current.text !== current.initialText, {
    path: ['text'],
    message: 'Modify text first.',
  });

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
}: Props) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const firstFocusableElement = useRef<HTMLButtonElement>(null);
  const lastFocusableElement = useRef<HTMLButtonElement>(null);

  const [initialText, setInitialText] = useState(value);

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

  const { verify, fieldErrors } = useZodVerifySchema(CommentFormSchema, {
    text: value,
    initialText,
  });

  const handleExecuteFunc = () => {
    const isValid = verify();
    if (!isValid) return;
    func();
  };

  return (
    <CommentFormContainer>
      {withTrap && <FocusTrapRedirectFocus element={lastFocusableElement} />}
      <CommentFormProfilePicture>
        <ProfileImage
          width={40}
          height={40}
          userId={user.user_id}
          elemRef={firstFocusableElement}
          imageUrl={user.profile_picture}
        />
      </CommentFormProfilePicture>
      <CommentFormBody>
        <AutoResizingTextarea
          label={'Write a comment'}
          error={error ? error : fieldErrors?.text ? fieldErrors.text[0] : undefined}
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
          <Button
            variant="primary"
            onClick={handleExecuteFunc}
            ref={lastFocusableElement}
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
