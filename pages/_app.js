import React from 'react'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import withRedux from 'next-redux-wrapper'
import dynamic from 'next/dynamic'

import { initializeStore } from '../store'
import GlobalStyles from '../css/GlobalStyles'

const CookieNotice = dynamic(() => import('components/CookieNotice'), {
    ssr: false
})

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
            if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
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
                        <CookieNotice/>
                    </Provider>
                    <GlobalStyles/>
                </Container>
            )
        }
    }
)