import React from 'react'
import styled from 'styled-components'

import { hex2rgb } from 'lib/helpers'

const Loader = props => {
    const height = props.height ? String(props.height).replace('px', '') : 2
    return (
        <Wrapper 
            className={props.className} 
            color={props.color || '#000'} 
            height={height} 
            style={props.style}
        >
            <div>
                <div></div>
            </div>
        </Wrapper>
    );
}

export default Loader;

const Wrapper = styled.div`
    > div {
        position: relative;
        height: ${props => props.height+'px'};
        display: block;
        width: 100%;
        background:  ${props => 'rgba('+hex2rgb(props.color)+',.2)'};
        margin: 0;
        top: ${props => props.height > 1 ? (props.height/2)+'px' : '0px'};
        overflow:hidden;
        z-index: 100;
        &.center {
            position:absolute;
            top:50%;
            left:0;
            z-index: 900;
        }
        > div {
            background-color: ${props => props.color};
            &:before {
                content: '';
                position: absolute;
                background-color: inherit;
                top: 0;
                left:0;
                bottom: 0;
                height:100%;
                will-change: left, right;
                animation: animate 2s cubic-bezier(0.650, 0.815, 0.735, 0.395) infinite;
            }
            &:after {
                content: '';
                position: absolute;
                background-color: inherit;
                top: 0;
                left:0;
                bottom: 0;
                height:100%;
                will-change: left, right;
                animation: animate-short 2s cubic-bezier(0.165, 0.840, 0.440, 1.000) infinite;
                animation-delay: 1.15s;
            }
        }
    }
    @keyframes animate {
        0% {
            left: -35%;
            right:100%;
        }
        60% {
            left: 100%;
            right: -90%;
        }
        100% {
            left: 100%;
            right: -90%;
        }
    }
    @keyframes animate-short {
        0% {
            left: -200%;
            right: 100%;
        }
        60% {
            left: 107%;
            right: -8%;
        }
        100% {
            left: 107%;
            right: -8%;
        }
    }
`