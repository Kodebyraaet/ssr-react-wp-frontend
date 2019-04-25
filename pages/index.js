import React from 'react';
import { withRouter } from 'next/router'
import Error from './_error'
//import { connect } from 'react-redux'
//import { bindActionCreators } from 'redux'

import Layout from '../components/Layout'
import api from '../api'
 
//import { setMenu, setWp, setLang } from '../store'

class Index extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    static async getInitialProps({ store, isServer, query, pathname, req }) {

        // if query slug is a file - return
        //if(~String(query.slug).indexOf('.')) return {}

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
        
        /*
        |--------------------------------------------------------------------------
        |  load page data by slug or ID (if home page)
        |--------------------------------------------------------------------------
        */
        let page = null
        const lang = init.lang
        if(query.slug) { 
            page = await api.get('page', { slug: query.slug, lang }) 
        } else {
            const storeState = store.getState()
            const homePageId = !lang ? storeState.wp.home_page.id : storeState.wp.home_page.translations[lang];
            page = await api.get('page', { id: homePageId })
        }

        page = Array.isArray(page) ? page[0] : page

        return { page }
    }

    async componentDidMount() {
        const { query } = this.props.router

        // get page preview if requested
        if(query.preview && query.id && query.nonce && query.type && query.image) {
            const preview = await api.get('preview', 
                { id: query.id, nonce: query.nonce, type: query.type, image: query.image }, 
                { credentials: 'include'}
            )
            if(preview) this.setState({ preview })
        }
    }
  
    render () {
        const { page, router } = this.props
        const { preview } = this.state

        const data = page || preview

        if(!data && !router.query.preview) return <Error statusCode={404} />

        return <Layout page={data} />
    }
}

export default withRouter(Index)

/*const mapDispatchToProps = dispatch => {
    return {
        setMenu: bindActionCreators(setMenu, dispatch),
        setWp: bindActionCreators(setWp, dispatch),
        setLang: bindActionCreators(setLang, dispatch),
    }
}
  
export default connect(null, mapDispatchToProps)(withRouter(Index))*/