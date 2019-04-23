import React from 'react'

import HeadMeta from './HeadMeta'
import Header from './Header'
import Footer from './Footer'
import Builder from './Builder'

export default props => 
    <React.Fragment>

        <HeadMeta page={props.page} />

        <Header />

        <Builder page={props.page} />

        <Footer />

    </React.Fragment>