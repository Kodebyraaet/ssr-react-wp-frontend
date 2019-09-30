import React from 'react'
import { Provider } from 'react-redux'
import App from 'next/app'
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

        render () {
            const { Component, pageProps, store } = this.props
            return (
                <>
                    <Provider store={store}>
                        <Component {...pageProps} />
                        <CookieNotice/>
                    </Provider>
                    <GlobalStyles/>
                </>
            )
        }
    }
)