import React, { Component } from 'react'
import Head from 'next/head'
import styled from 'styled-components'

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
                    <ErrorCode>{statusCode}</ErrorCode>
                <Footer />
            </div>
        )
    }
}

export default Error

const ErrorCode = styled.div`
    text-align:center;
    font-size:300px;
    line-height: 2;
    font-weight: 700;
    @media(max-width: 767px) {
        font-size:50px;
    }
`