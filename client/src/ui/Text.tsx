import React from 'react';
import styled from 'styled-components';

const TextStyles = styled.p<{ isMuted: boolean | undefined; size: string | undefined }>`
  color: ${(props) =>
    props.isMuted ? props.theme.textMutedColor : props.theme.textColor};
  font-size: ${(props) => (props.size === 'small' ? '0.85rem' : '1rem')};
`;

const ErrorTextStyles = styled.p<{ size: string | undefined }>`
  color: ${(props) => props.theme.errorColor};
  font-size: ${(props) => (props.size === 'small' ? '0.85rem' : '1rem')};
  margin-bottom: 10px;
`;

export const Text = ({
  children,
  isMuted,
  size,
}: {
  children: React.ReactNode;
  isMuted?: boolean;
  size?: 'small' | 'normal';
}) => {
  return (
    <TextStyles isMuted={isMuted} size={size}>
      {children}
    </TextStyles>
  );
};

export const ErrorText = ({
  children,
  size,
}: {
  children: React.ReactNode;
  size?: 'small' | 'normal';
}) => {
  return <ErrorTextStyles size={size}>{children}</ErrorTextStyles>;
};
