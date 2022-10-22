import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';

const TextareaContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Textarea = styled.textarea`
  position: relative;
  width: 100%;
  background-color: transparent;
  outline: none;
  resize: none;
  font-size: 1rem;
  padding: 3px;
  outline: none;
  border: none;
  color: ${(props) => props.theme.textColor};
  white-space: pre-line;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TextareaLine = styled.div<{ active: boolean }>`
  position: relative;
  width: 100%;
  height: 2px;
  background-color: ${(props) => (props.active ? 'white' : props.theme.borderColor)};
`;

const AutoResizingTextarea = ({
  value,
  onChange,
  placeholder,
  onFocus,
  onBlur,
  autoFocus,
}: {
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  autoFocus?: boolean;
}) => {
  const [active, setActive] = useState(false);

  const uniqueTextareaId = useRef(v4());

  const handleResize = () => {
    const textarea = document.getElementById(
      uniqueTextareaId.current
    ) as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    handleResize();
  }, [value]);

  const handleOnFocus = () => {
    if (onFocus) onFocus();
    setActive(true);
  };

  const handleOnBlur = () => {
    if (onBlur) onBlur();
    setActive(false);
  };
  return (
    <TextareaContainer>
      <Textarea
        id={uniqueTextareaId.current}
        rows={1}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onInput={handleResize}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        autoFocus={autoFocus}
        maxLength={1500}
      />
      <TextareaLine active={active} />
    </TextareaContainer>
  );
};

export default AutoResizingTextarea;
