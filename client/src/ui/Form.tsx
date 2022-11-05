import styled from 'styled-components';
import { BORDER_RADIUS_ROUND, MOBILE_BREAK_POINT } from '../layout/style';

export const FormWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 500px) {
    align-items: flex-start;
  }
`;

export const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  display: block;
  padding: 30px;
  border-radius: 5px;
  @media (max-width: 500px) {
    width: 100%;
    border: none;
  }
`;

export const FormLogoAndTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const FormTitle = styled.h1`
  color: ${(props) => props.theme.textColor};
  margin-bottom: 40px;
  font-size: 1.3rem;
  width: max-content;
`;

export const FormLabel = styled.label`
  display: block;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 15px;
`;

export const FormInput = styled.input`
  display: block;
  border: solid red 1px;
  width: 100%;
  border: solid 1px ${(props) => props.theme.borderColor};
  border-radius: ${BORDER_RADIUS_ROUND}px;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.inputBg};
  padding: 8px 16px;
  font-size: 1rem;
  width: 100%;
  margin-top: 5px;
`;

export const FormAlternativeParagraph = styled.p`
  color: ${(props) => props.theme.textColor};
  margin-top: 20px;
  & a {
    color: ${(props) => props.theme.accentColor};
  }
`;

export const FormMessage = styled.p`
  color: ${(props) => props.theme.textColor};
  margin-bottom: 15px;
`;

export const FormErrorMessage = styled.small`
  color: red;
  margin-bottom: 15px;
`;
