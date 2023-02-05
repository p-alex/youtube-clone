import { createGlobalStyle } from 'styled-components';
import { BORDER_RADIUS_ROUND } from '../layout/style';

export const GlobalStyle = createGlobalStyle`
  :root {
    --backdrop-bg: rgba(0,0,0,0.7);
    --nav-bar-layer: 100;
    --modal-layer: 200;

    --space-small: 8px;
    --space-medium: 16px;
    --space-big: 24px;
    --space-large: 32px;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    letter-spacing: .5px;
  }

  html {
    height: 100%;
  }
  
  body {
    background-color: ${(props) => props.theme.siteBg};
  }

  #__next {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 100%;
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
    font-size: 1.75rem;
  }
  h2 {
    font-size: 1.2rem;
  }
  h3 {
    font-size: 1.15rem;
  }
`;
