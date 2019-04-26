import { createGlobalStyle } from 'styled-components'

import colors from './colors'

export default createGlobalStyle`
    html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed,  figure, figcaption, footer, header, hgroup,  menu, nav, output, ruby, section, summary, time, mark, audio, video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline; } /* HTML5 display-role reset for older browsers */ article, aside, details, figcaption, figure,  footer, header, hgroup, menu, nav, section { display: block; } body { line-height: 1; } ol, ul { list-style: none; } blockquote, q { quotes: none; } blockquote:before, blockquote:after, q:before, q:after { content: ''; content: none; } table { border-collapse: collapse; border-spacing: 0; }

    * {
        box-sizing: border-box;
    }
    
    html {
        max-width: 100%;
        overflow-x: hidden;
    }

    body {
        font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
        font-size: 16px;
        line-height: 1.3;
        background: ${colors.background};
        color: ${colors.text};
        min-height: 100vh;
        font-display: fallback;
        max-width:100%;
        overflow-x: hidden;
    }

    /*@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,700');
    body {
        font-family: 'Roboto', sans-serif;
        font-size:16px;
        line-height: 1.2;
        font-weight: 400;
    }*/

    /*@font-face {
        @font-face {
            font-family: 'Circular Std Book';
            src: url('/static/fonts/CircularStd-Book.ttf');
            font-weight: normal;
            font-display: auto;
            font-style: normal;
        }
    }
    body {
        font-family: 'Circular Std Book';
        -webkit-font-smoothing: antialiased;
        font-size:16px;
        line-height: 1.2;
    }*/

    a, a:hover, a:visited, a:active {
        text-decoration: none;
        color: ${colors.accent};
    }

    div {
        //outline: 1px dotted #ccc;
    }

    img {
        max-width: 100%;
        height:auto;
    }
`