import React from 'react'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import withRedux from 'next-redux-wrapper'

import { initializeStore } from '../store'
import GlobalStyles from '../css/GlobalStyles'

export default withRedux(initializeStore)(
    class MyApp extends App {
        static async getInitialProps ({ Component, ctx }) {

            return {
                pageProps: Component.getInitialProps
                ? await Component.getInitialProps(ctx)
                : {}
            }
        }

        componentDidMount() {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker
                    .register('/service-worker.js')
                    .then(registration => {
                        console.log('service worker registration successful')
                    })
                    .catch(err => {
                        console.warn('service worker registration failed', err.message)
                    })
            }
        }

        render () {
            const { Component, pageProps, store } = this.props
            return (
                <Container>
                    <Provider store={store}>
                        <Component {...pageProps} />
                    </Provider>
                    <GlobalStyles/>
                </Container>
            )
        }
    }
)