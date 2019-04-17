import React from 'react';
import styled from 'styled-components';

export default ({ children, ...rest}) => {
    return (
        <Container {...rest} >
            {children}
        </Container>
    );
}

const Container = styled.div`
    width:100%;
    max-width: 1180px;
    margin: 0 auto;
    
    @media(max-width: 1180px) {
        padding: 0 20px;
    }

    ${({flex}) => flex ? `display: flex;` : ``}
    ${({justify}) => justify ? `justify-content: ${justify};` : ``}
    ${({align}) => align ? `align-items: ${align};` : ``}
`
