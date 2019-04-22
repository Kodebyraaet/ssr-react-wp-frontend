import React, { Component } from 'react'
import Head from 'next/head'

import Header from '../components/Header'
import Footer from '../components/Footer'

class Error extends Component {

    static getInitialProps({ res, err }) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : null
        return { statusCode }
    }

    render() {
        const { statusCode } = this.props
        return (
            <div>
                <Head>
                    <title>{statusCode} error</title>
                </Head>
                <Header />
                {statusCode} Error
                <Footer />
            </div>
        )
    }
}

export default Error