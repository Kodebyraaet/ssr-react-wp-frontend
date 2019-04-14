import React from 'react'
import Header from './Header.js'
import Footer from './Footer.js'

export default props => 
    <React.Fragment>
        <Header />
        {props.children}
        <Footer />
    </React.Fragment>