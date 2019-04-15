import React from 'react'

import HeadMeta from './HeadMeta'
import Header from './Header'
import Footer from './Footer'

export default props => 
    <React.Fragment>
        <HeadMeta page={props.page} />
        <Header />
        {props.children}
        <Footer />
    </React.Fragment>