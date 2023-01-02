import styled from 'styled-components';
import { MOBILE_BREAK_POINT } from '../../layout/style';

export const CommentSection__Container = styled.div`
  position: relative;
  margin: 20px auto;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    padding: 20px;
  }
`;

export const CommentSection__TotalComments = styled.div`
  color: ${(props) => props.theme.textColor};
  margin-bottom: 15px;
  font-size: 1rem;
`;

export const CommentSection__LoadBtn = styled.button`
  color: ${(props) => props.theme.accentColor};
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.8rem;
  position: relative;
  width: max-content;
  padding: 10px;
`;
