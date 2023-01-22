import styled from 'styled-components';
import { BORDER_RADIUS_ROUND, MOBILE_BREAK_POINT } from '../layout/style';

export const ManageAccountPage__Box = styled.section`
  position: relative;
  margin-bottom: 40px;
`;

export const ManageAccountPage__BoxTitle = styled.h2`
  margin-bottom: 20px;
  color: ${(props) => props.theme.textColor};
`;

export const ManageAccountPage__Button = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  padding: 20px;
  background-color: ${(props) => props.theme.normalBtn.bg};
  margin-bottom: 10px;
  border-radius: ${BORDER_RADIUS_ROUND}px;
  & svg {
    color: ${(props) => props.theme.textMutedColor};
  }
  &:hover {
    background-color: ${(props) => props.theme.normalBtn.bgHover};
  }
`;

export const ManageAccount__ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
`;

export const ManageAccount__ButtonTitle = styled.p`
  font-weight: 700;
  width: 220px;
  text-align: left;
  color: ${(props) => props.theme.textMutedColor};
`;

export const ManageAccountPage__Text = styled.p``;
