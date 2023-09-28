import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    // Colors
    --white: #ffff;
    --black: #000000;
    --red-maroon: #3D0000;
    --red-strong: #950101;
    --red-high: #FF0000;
    // Spaces
    --space-lang: 1400px;
    --space-short: 700px;
    // Fonts
    --font-title: 4em;
    --font-medium: 1.5em;
    --font-small: 'PT Sans', sans-serif;
  }

  body{
    background-color: #FF3CAC;
    background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);
    font-family: var(--font-small);
    font-size: 0.95em;
  }

  span{
    color: var(--white);
  }

  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`

export default GlobalStyles
