import React from 'react';
import { withRouter } from 'next/router'
import Error from './_error'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Layout from '../components/Layout'
import api from '../api'
import { isServer } from 'lib/helpers'
 
import { setMenu, setWp, setLang } from '../store'

class Index extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    static async getInitialProps({ store, isServer, query, pathname, req }) {

        // if query slug is a file - return
        if(~String(query.slug).indexOf('.')) return {}

        let storeState = store.getState()

        /*
        |--------------------------------------------------------------------------
        |  get WP config from API and save it in store
        |--------------------------------------------------------------------------
        */
        if(!storeState.wp) {
            const wp = await api.get('config', { lang: query.lang || '' })
            store.dispatch(setWp(wp))
            storeState = store.getState() // get state again so it contains 'wp'
        }

        if(!storeState.wp) return {}

        /*
        |--------------------------------------------------------------------------
        |  set current language
        |--------------------------------------------------------------------------
        */
        const lang = query.lang || storeState.wp.default_language
        if(lang !== storeState.lang) {
            store.dispatch(setLang(lang))
            storeState = store.getState() // get state again so it contains 'lang'
        }

        /*
        |--------------------------------------------------------------------------
        |  get main menu
        |--------------------------------------------------------------------------
        */
        const location = 'primary-menu'
        const menuInStore = lang ? 
                            (storeState && storeState.menus[lang] && storeState.menus[lang][location]) 
                            :
                            (storeState && storeState.menus[location])
        if(!menuInStore) {
            const menu = await api.get('menu', { location, lang })
            store.dispatch(setMenu({ menu, location, lang }))
        }

        /*
        |--------------------------------------------------------------------------
        |  If preview requested return before fetching page data
        |--------------------------------------------------------------------------
        */
        if(query.preview && query.id && query.nonce && query.type && query.image) {
            return {}
        }
        
        /*
        |--------------------------------------------------------------------------
        |  load page data by slug or ID (if home page)
        |--------------------------------------------------------------------------
        */
        let page = null
        if(query.slug) { 
            page = await api.get('page', { slug: query.slug, lang }) 
        } else {
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

const mapDispatchToProps = dispatch => {
    return {
        setMenu: bindActionCreators(setMenu, dispatch),
        setWp: bindActionCreators(setWp, dispatch),
        setLang: bindActionCreators(setLang, dispatch),
    }
}
  
export default connect(null, mapDispatchToProps)(withRouter(Index))