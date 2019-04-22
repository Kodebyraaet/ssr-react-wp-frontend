import React from 'react'

// NonSsrComponent will ont be rendered on the server
import dynamic from 'next/dynamic'
const NonSsrComponent = dynamic(() => import('components/NonSsrComponent'), {
    loading: () => <div>loading...</div>,
    ssr: false
});

export default () => 
    <div>
        <p>&copy; 2019</p>
        <NonSsrComponent />
    </div>