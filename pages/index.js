import React from 'react';
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Layout from 'components/Layout'
import Builder from 'components/Builder'
import api from 'api'
import { isServer } from 'lib/helpers'

import { saveMenu } from '../store'

class Index extends React.Component {

    static async getInitialProps({ store, query, req }) {

        const storeState = store.getState()

        // load main menu
        if(storeState && !storeState.menus.en['main-menu']) {
            const menu = await api.getMenuByLocation('main-menu')
            store.dispatch(saveMenu({ menu, location:'main-menu', lang:'en' }))
        }

        // todo : console.log(query) returns favicon.ico - check this
        // todo : menu does not get stored in redux on the server so if(storeState && !storeState.menus.en['main-menu']) always returns FALSE on the server
        
        // load page data
        const page = query.slug ? await api.getPageBySlug(query.slug) : await api.getHomePage()
        if(!isServer()) console.log('Page:', page);

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