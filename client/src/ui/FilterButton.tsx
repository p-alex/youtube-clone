import React from 'react';
import styled from 'styled-components';
import { BORDER_RADIUS_ROUND } from '../layout/style';

export const FilterBtn = styled.button<{ isActive: boolean }>`
  padding: var(--space-small) var(--space-medium);
  background-color: ${(props) =>
    props.isActive ? props.theme.normalBtn.bgHover : props.theme.normalBtn.bg};
  color: ${(props) => props.theme.textColor};
  border-radius: ${BORDER_RADIUS_ROUND}px;
  &:hover {
    background-color: ${(props) => props.theme.normalBtn.bgHover};
  }
`;

interface Props {
  onClick?: () => void;
  isActive: boolean;
  children: string;
}

const FilterButton = ({ onClick, isActive, children }: Props) => {
  return (
    <FilterBtn isActive={isActive} type="button" onClick={onClick}>
      {children}
    </FilterBtn>
  );
};

export default FilterButton;
