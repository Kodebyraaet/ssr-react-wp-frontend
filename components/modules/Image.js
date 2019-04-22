import React, { Component } from 'react';
import styled from 'styled-components';

import Image from '../Image';
import Container from '../Container';

class RichText extends Component {
    render() {
        const { data } = this.props;
        //console.log('Image:', data);
        return (
            <ModuleWrapper>
                <Container>
                    <Image image={data.image} background ratio="16:9" />
                </Container>
            </ModuleWrapper>
        );
    }
}

export default RichText;

const ModuleWrapper = styled.div`
    margin-bottom:80px;
    @media (max-width: 768px) {
        margin-bottom:40px;
    }
`