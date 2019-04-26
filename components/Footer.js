import React from 'react'

import Loader from 'components/Loader'

// NonSsrComponent will ont be rendered on the server
import dynamic from 'next/dynamic'
const NonSsrComponent = dynamic(() => import('components/NonSsrComponent'), {
    loading: () => <Loader style={{width:100}} />,
    ssr: false
});

export default () => 
    <div>
        <p>&copy; 2019</p>
        <NonSsrComponent />
    </div>