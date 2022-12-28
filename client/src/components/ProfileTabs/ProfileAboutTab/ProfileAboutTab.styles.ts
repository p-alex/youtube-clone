import styled from 'styled-components';
import { MOBILE_BREAK_POINT } from '../../../layout/style';

export const ProfileAboutTab__Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 20px;
  margin-top: 20px;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    flex-direction: column;
  }
`;

export const ProfileAboutTab__Box = styled.div<{ width?: string }>`
  position: relative;
  width: ${(props) => (props.width ? props.width : '100%')};
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    width: 100%;
  }
`;

export const ProfileAboutTab__Description = styled.p`
  color: ${(props) => props.theme.textColor};
  line-height: 20px;
  white-space: pre-line;
  font-size: 0.85rem;
`;

export const ProfileAboutTab__Title = styled.h2`
  position: relative;
  color: ${(props) => props.theme.textColor};
  padding: 20px 0;
  margin-bottom: 20px;
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
`;

export const ProfileAboutTab__List = styled.ul`
  list-style-type: none;
  color: ${(props) => props.theme.textColor};
`;

export const ProfileAboutTab__Item = styled.li`
  display: block;
  padding: 15px 0;
  font-size: 0.85rem;
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
`;

export const ProfileAboutTab__Text = styled.p`
  position: relative;
  color: ${(props) => props.theme.textColor};
`;
