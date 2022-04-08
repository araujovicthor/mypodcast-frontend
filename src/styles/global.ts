import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #003881;
    --primary-light: #0357C3;
    --primary-dark: #032551;
    --titles: #080D4E;
    --texts: #7C7C7C;
    --white: #FFF;
    --background: #FFFFFF;
    --card: #F6F8FC;
    --card-dark: #e9e9e9;
    --positive: #1FB213;
    --neutral: #F9E321;
    --negative: #EF1818;
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing:border-box;
  }

  body {
    background: var(--background);
    color: var(--texts);
    -webkit-font-smoothing: antialiased !important;
    text-rendering: optimizelegibility;
    line-height: 1;
  }

  body, input, textarea, button {
    font-family: 'Poppins', Helvetica, sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-family: 'Poppins', Helvetica, sans-serif;
    font-weight: 600;
  }

  button {
    cursor: pointer;
    outline: none;
    color: var(--white);
    background-color: var(--primary);
    border:0;
  }

  a {
    font-weight: 600;
    text-decoration: none;
    color: #7c7c7c;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
