import styled from 'styled-components';

export const VideoFunctions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

export const VideoFunctionButton = styled.button`
  color: #111;
  background-color: ${(props) => props.theme.accentColor};
  border-radius: 5px;
  padding: 10px;
  font-weight: bold;
`;
