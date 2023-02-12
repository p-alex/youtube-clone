import styled from 'styled-components';

export const ConfirmationModalTitle = styled.h2`
  color: ${(props) => props.theme.textColor};
`;

export const ConfirmationModalButtons = styled.div`
  display: flex;
  gap: var(--space-small);
  width: max-content;
  float: right;
`;
