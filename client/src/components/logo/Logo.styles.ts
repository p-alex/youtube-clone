import styled from 'styled-components';

export const Logo__Container = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${(props) => props.theme.textColor};
  font-weight: bold;
  cursor: pointer;
`;

export const Logo__Custom = styled.div`
  position: relative;
  width: 35px;
  height: 25px;
  background-color: #ff0000;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  & svg {
    width: 20px;
    height: 20px;
    color: white;
  }
`;
