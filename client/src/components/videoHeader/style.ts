import styled from 'styled-components';
import { CONTAINER_HORIZONTAL_PADDING, MOBILE_BREAK_POINT } from '../../layout/style';

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  height: 120px;
  gap: 10px;
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    padding: 20px ${CONTAINER_HORIZONTAL_PADDING}px;
  }
`;
export const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  font-weight: 400;
  font-size: 1.5rem;
`;
export const ReactContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
export const Stats = styled.div`
  display: flex;
  gap: 10px;
  color: ${(props) => props.theme.textMutedColor};
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    & :nth-child(2) {
      display: none;
    }
    & :nth-child(3) {
      font-size: 0.8rem;
    }
    gap: 7px;
    flex-direction: column;
  }
`;

export const ReactAndRatioContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ReactBtnContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const RatioBar = styled.div<{ width: number }>`
  position: relative;
  width: 100%;
  height: 3px;
  background-color: ${(props) => props.theme.textMutedColor};
  &::after {
    content: '';
    position: absolute;
    width: ${(props) => props.width}%;
    background-color: ${(props) => props.theme.textColor};
    height: 100%;
  }
`;

export const ReactBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${(props) => props.theme.textColor};
  padding: 10px;
  font-size: 1.2rem;
  & svg {
    font-size: 1.6rem;
  }
`;
