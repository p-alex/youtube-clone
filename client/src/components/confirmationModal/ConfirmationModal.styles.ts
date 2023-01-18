import styled from 'styled-components';
import { BORDER_RADIUS_ROUND } from '../../layout/style';

export const ConfirmationModalTitle = styled.h2`
  color: ${(props) => props.theme.textColor};
`;

export const ConfirmationModalButtons = styled.div`
  display: flex;
  gap: 20px;
  width: max-content;
  float: right;
`;
