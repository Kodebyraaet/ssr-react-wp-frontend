import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'

import withReduxStore from 'lib/with-redux-store'

import GlobalStyles from 'css/GlobalStyles'

class MyApp extends App {
    render () {
        const { Component, pageProps, reduxStore } = this.props
        return (
            <Container>
                <Provider store={reduxStore}>
                <Component {...pageProps} />
                </Provider>
                <GlobalStyles/>
            </Container>
        )
    }
}

export default withReduxStore(MyApp)