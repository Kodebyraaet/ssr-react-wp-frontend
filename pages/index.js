import React from 'react';
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Layout from 'components/Layout'
import Builder from 'components/Builder'
import api from 'api'

import { saveMenu } from '../store'

class Index extends React.Component {

    static async getInitialProps({ store, isServer, query, pathname, req }) {

        // if query slug is a file - return
        if(~String(query.slug).indexOf('.')) return {}

        const storeState = store.getState()

        // load main menu
        const menuLocation = 'primary-menu';
        const menuInStore = storeState && storeState.menus[query.lang] && storeState.menus[query.lang][menuLocation];
        if(!menuInStore) {
            const menu = await api.getMenuByLocation(menuLocation, query.lang)
            store.dispatch(saveMenu({ menu, location: menuLocation, lang: query.lang }))
        }
        
        // load page data
        const page = query.slug ? await api.getPageBySlug(query.slug, query.lang) : await api.getHomePage(query.lang)
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
    }
}
  
export default connect(null, mapDispatchToProps)(withRouter(Index))