import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 60px);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ResultContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  & svg {
    font-size: 80px;
    color: ${(props) => props.theme.textColor};
  }
`;

export const Message = styled.h3`
  color: ${(props) => props.theme.textColor};
`;
