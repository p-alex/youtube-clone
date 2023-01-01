import styled from 'styled-components';

export const ReplySectionWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const ReplyToggleBtn = styled.button`
  width: max-content;
  color: ${(props) => props.theme.accentColor};
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
  text-transform: uppercase;
  margin-top: 5px;
  font-size: 0.8rem;
  margin-bottom: 10px;
  & svg {
    font-size: 0.8rem;
  }
`;

export const ReplySectionContainer = styled.div`
  margin-top: 12px;
`;

export const ReplyLoadMoreBtn = styled.button`
  width: max-content;
  color: ${(props) => props.theme.accentColor};
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin-bottom: 25px;
`;
