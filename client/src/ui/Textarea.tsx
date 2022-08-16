import styled from 'styled-components';

export const Textarea = styled.textarea`
  position: relative;
  display: block;
  width: 100%;
  border: solid 1px ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.inputBg};
  padding: 10px;
  resize: vertical;
  font-size: 1rem;
  min-height: 100px;
`;
