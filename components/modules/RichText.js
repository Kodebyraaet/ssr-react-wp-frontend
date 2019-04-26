import React, { Component } from 'react'
import styled from 'styled-components'

import Container from '../Container'
import Html from '../Html'
import colors from 'css/colors'

class RichText extends Component {
    render() {
        const { data } = this.props
        //console.log('Rich text:',data);
        return (
            <ModuleWrapper>
                <Container>
                    <Html content>{data.content}</Html>
                </Container>
            </ModuleWrapper>
        );
    }
}

export default RichText;

const ModuleWrapper = styled.article`
    margin-bottom:80px;
    @media (max-width: 768px) {
        margin-bottom:40px;
    }

    p {
        margin-bottom:20px;
        line-height:1.4;
    }

    h1, h2, h3, h4, h5, h6 {
        margin-bottom: 20px;
        font-weight: 600;
    }

    h1 { font-size: 40px }
    h2 { font-size: 35px }
    h3 { font-size: 30px }
    h4 { font-size: 25px }
    h5 { font-size: 20px }
    h6 { font-size: 16px }

    a {
        color: ${colors.accent};
        text-decoration: underline;
        &:hover {
            text-decoration: none;
        }
    }
`