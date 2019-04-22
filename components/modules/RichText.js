import React, { Component } from 'react';
import styled from 'styled-components';

import Container from '../Container';
import Html from '../Html';

class RichText extends Component {
    render() {
        const { data } = this.props;
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
`