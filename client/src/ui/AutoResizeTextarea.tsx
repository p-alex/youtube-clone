import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BORDER_RADIUS_ROUND } from '../layout/style';

interface IAutoResizeTextarea {
  label: string;
  error?: string | undefined;
  value: string;
  setValue: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  autoFocus?: boolean;
  maxLength?: number;
  hideLabel?: boolean;
}

const AutoResizeTextarea__Container = styled.div`
  color: ${(props) => props.theme.textColor};
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-bottom: 20px;
`;

const AutoResizeTextArea__Label = styled.label`
  font-weight: 700;
  text-transform: capitalize;
`;

const AutoResizeTextarea__Error = styled.p`
  font-weight: 700;
  color: ${(props) => props.theme.errorColor};
  font-size: 0.85rem;
`;

const AutoResizeTextarea__Textarea = styled.textarea<{ isError: boolean }>`
  position: relative;
  width: 100%;
  resize: none;
  font-size: 1rem;
  padding: 3px;
  border: ${(props) =>
    props.isError ? `solid ${props.theme.errorColor} 1px` : `solid transparent 1px`};
  color: ${(props) => props.theme.textColor};
  white-space: pre-line;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  display: block;
  background-color: ${(props) => props.theme.uiSecondaryBg};
  padding: 10px;
  border-radius: ${BORDER_RADIUS_ROUND}px;
`;

const AutoResizingTextarea = ({
  label,
  error,
  value,
  setValue,
  placeholder,
  onFocus,
  onBlur,
  autoFocus,
  maxLength,
  hideLabel,
}: IAutoResizeTextarea) => {
  const handleResize = () => {
    const textarea = document.getElementById(formatedId) as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const RANDOM_TEXTAREA_ID = useRef<string>(
    'autoresizing-textarea-' + Math.floor(Math.random() * 1000)
  );

  useEffect(() => {
    handleResize();
  }, [value]);

  const handleOnFocus = () => {
    if (onFocus) onFocus();
  };

  const handleOnBlur = () => {
    if (onBlur) onBlur();
  };

  const formatedId = hideLabel
    ? RANDOM_TEXTAREA_ID.current
    : label.replaceAll(' ', '-').toLowerCase();

  return (
    <AutoResizeTextarea__Container>
      {!hideLabel && (
        <AutoResizeTextArea__Label htmlFor={formatedId}>
          {label}
        </AutoResizeTextArea__Label>
      )}
      <AutoResizeTextarea__Textarea
        id={formatedId}
        name={formatedId}
        rows={1}
        placeholder={placeholder}
        value={value}
        onChange={setValue}
        onInput={handleResize}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        autoFocus={autoFocus}
        maxLength={maxLength}
        isError={error !== undefined}
      />
      {error && <AutoResizeTextarea__Error>{error}</AutoResizeTextarea__Error>}
    </AutoResizeTextarea__Container>
  );
};

export default AutoResizingTextarea;
