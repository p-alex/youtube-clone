import { createGlobalStyle } from 'styled-components';
import { BORDER_RADIUS_ROUND } from '../layout/style';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    letter-spacing: .5px;
  }

  body {
    background-color: ${(props) => props.theme.siteBg};
  }

  button {
    background: none;
    border:none;
    cursor: pointer;
    font-size: 1rem;
  }

  a {
    cursor: pointer;
    text-decoration: none;
  }

  p{
    line-height: 20px;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  svg {
    font-size: 1.5rem;
  }

  input:disabled {
    opacity: 0.3;
  }

  img {
    border-radius: ${BORDER_RADIUS_ROUND}px;
  }

  h1 {
    font-size: 1.55rem;
  }
  h2 {
    font-size: 1.35rem;
    line-height: 25px;
  }
  h3 {
    font-size: 1.15rem;
  }
`;
