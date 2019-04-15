import React from 'react';
import styled from 'styled-components';

export default props => {
    const { data } = props;
    //console.log('EmptySpace:',data);
    return (
        <ModuleWrapper height={data.height || '100px'} />
    );
}

const ModuleWrapper = styled.div`
    height: ${props => props.height};

    ${props => props.height === '100px' ? `
        @media (max-width:768px) {
            height: 50px;
        }
    ` : ``}
`