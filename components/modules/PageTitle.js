import React from 'react';
import styled from 'styled-components';

import Container from 'components/Container'

export default props => {
    return (
        <Container>
            <Title dangerouslySetInnerHTML={{ __html: props.page.title.rendered }} />
        </Container>
    );
}

const Title = styled.h1`
    font-size: 40px;
    font-weight: 700;
    border-bottom: 1px solid #ccc;
    padding-bottom:10px;
    margin-bottom:30px;
    @media(max-width: 767px) {
        font-size:25px;
    }
`