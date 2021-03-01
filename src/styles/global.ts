import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
  }

  body {
    background: linear-gradient(45deg, ${props => props.theme.colors.gradient.primary } 0%, ${props => props.theme.colors.gradient.secondary } 100%);
    -webkit-font-smoothing: antialiased;
    height: 100vh;
  }

  body, input, button {
    font: 16px Roboto, sans-serif;
    color: ${props => props.theme.colors.text }
  }

  #root {
    max-width: 1100px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  button {
    cursor: pointer;
  }
`;
