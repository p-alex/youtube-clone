import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    transition: background 200ms ease-in-out;
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
`;
