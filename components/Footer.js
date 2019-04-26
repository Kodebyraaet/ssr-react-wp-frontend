import React from 'react'

import Loader from 'components/Loader'
import Container from 'components/Container'

// NonSsrComponent will ont be rendered on the server
import dynamic from 'next/dynamic'
const NonSsrComponent = dynamic(() => import('components/NonSsrComponent'), {
    loading: () => <Loader style={{width:100}} />,
    ssr: false
});

export default () => 
    <Container>
        <p>&copy; 2019</p>
        <NonSsrComponent />
    </Container>