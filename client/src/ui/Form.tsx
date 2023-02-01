import styled from 'styled-components';
import { NAV_BAR_HEIGHT } from '../layout/style';

export const FormWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 500px) {
    align-items: flex-start;
  }
`;

export const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 365px;
  display: block;
  padding: var(--space-large);
  border-radius: 5px;
  margin: calc(${NAV_BAR_HEIGHT}px + 40px) auto 0 auto;
  @media (max-width: 500px) {
    width: 100%;
    border: none;
    margin: 0 auto 0 auto;
  }
`;

export const FormLogoAndTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-small);
`;

export const FormTitle = styled.h1`
  color: ${(props) => props.theme.textColor};
  margin-bottom: var(--space-large);
  font-size: 1.4rem;
  width: max-content;
`;

export const FormAlternativeParagraph = styled.p`
  color: ${(props) => props.theme.textColor};
  margin-top: var(--space-big);
  & a {
    color: ${(props) => props.theme.accentColor};
  }
`;

export const FormMessage = styled.p`
  color: ${(props) => props.theme.textColor};
  margin-bottom: var(--space-medium);
`;

export const FormErrorMessage = styled.small`
  color: red;
  margin-bottom: var(--space-medium);
`;
