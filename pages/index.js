import React from 'react';
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Layout from 'components/Layout'
import Builder from 'components/Builder'
import api from 'api'

import { saveMenu, saveWp } from '../store'

class Index extends React.Component {

    static async getInitialProps({ store, isServer, query, pathname, req }) {

        // if query slug is a file - return
        if(~String(query.slug).indexOf('.')) return {}

        let storeState = store.getState()
        const { slug, lang } = query

        /*
        |--------------------------------------------------------------------------
        |  get WP config from API and save it in store
        |--------------------------------------------------------------------------
        */
        if(!storeState.wp) {
            const wp = await api.getWp()
            store.dispatch(saveWp(wp))
            storeState = store.getState() // get state again so it contains 'wp'
        }

        /*
        |--------------------------------------------------------------------------
        |  get main menu
        |--------------------------------------------------------------------------
        */
        const location = 'primary-menu'
        const menuInStore = storeState && 
                            storeState.menus[lang] && 
                            storeState.menus[lang][location]
        if(!menuInStore) {
            const menu = await api.getMenuByLocation({ location, lang })
            store.dispatch(saveMenu({ menu, location, lang }))
        }
        
        /*
        |--------------------------------------------------------------------------
        |  load page data by slug or ID (if home page)
        |--------------------------------------------------------------------------
        */
        let page = null
        if(slug) { 
            page = await api.getPageBySlug({ slug, lang }) 
        } else {
            const homePageId = !lang ? storeState.wp.home_page.id : storeState.wp.home_page.translations[lang];
            page = await api.getHomePage({ id: homePageId })
        }

        if(!isServer) console.log('Page:', page);

        return { page }
    }
  
    render () {
        const { page } = this.props;

        if(!page) return null;

        return(
            <Layout page={page}>
                <h3>{page.title.rendered}</h3>
                <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
                <Builder data={page.acf.modules} page={page} />
            </Layout>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveMenu: bindActionCreators(saveMenu, dispatch),
        saveWp: bindActionCreators(saveWp, dispatch),
    }
}
  
export default connect(null, mapDispatchToProps)(withRouter(Index))