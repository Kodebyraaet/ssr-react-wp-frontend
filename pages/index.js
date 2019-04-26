import React from 'react';
import { withRouter } from 'next/router'
import Error from './_error'
//import NProgress from 'nprogress'

import Layout from '../components/Layout'
import api from '../api'
import { arrayFirst, isServer } from 'lib/helpers'
 
class Index extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    static async getInitialProps({ store, isServer, query, pathname, req }) {

        /*
        |--------------------------------------------------------------------------
        |  Page init
        |--------------------------------------------------------------------------
        | fetches WP config & saves it to store
        | fetches main menu & saves it to store
        | sets current language in store
        | checks if preview was requested
        */
        const init = await api.initPage({ query, store })

        if(!init) return {} // if init failed - die (most likely WP config not available)

        if(init.previewRequested) return { init } // if preview requested return here - preview will be fetched from client side

        /*
        |--------------------------------------------------------------------------
        |  load page data by slug or ID (if home page)
        |--------------------------------------------------------------------------
        */
        if(query.slug) { 
            const page = await api.get(query.type || 'page', { slug: query.slug, lang: init.lang }) 
            return { page: arrayFirst(page), init }
        } else {
            const homePageId = !init.lang ? init.wp.home_page.id : init.wp.home_page.translations[init.lang];
            const page = await api.get('page', { id: homePageId })
            return { page: arrayFirst(page), init }
        }
        
    }

    componentDidMount() {
        
        // get page preview if requested (NOTE: previews can only be fetched from clinet side - node-fetch does not support 'credentials')
        this.maybeFetchPreview()

    }

    async maybeFetchPreview() {
        const { init } = this.props

        if(init && init.previewRequested) {
            const { id, nonce, type, image } = this.props.router.query
            const preview = await api.get('preview', 
                { id, nonce, type, image }, 
                { credentials: 'include'}
            )
            this.setState({ preview: arrayFirst(preview) })
        }
    }
  
    render () {
        const { page, init } = this.props

        //if(!isServer) NProgress.set(1).done()

        if(init && init.previewRequested) return <Layout page={this.state.preview} />

        return page ? <Layout page={page} /> : <Error statusCode={404} />

    }
}

export default withRouter(Index)