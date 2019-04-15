import React from 'react';
import { withRouter } from 'next/router'

import Layout from 'components/Layout'
import Builder from 'components/Builder'
import api from 'api'
import { isServer } from 'lib/helpers'

const Index = withRouter( ({ router, page }) => {

    if(!page) return null;

    return(
        <Layout page={page}>
            <h3>{page.title.rendered}</h3>
            <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
            <Builder data={page.acf.modules} page={page} />
        </Layout>
    )
})

Index.getInitialProps = async ({ pathname, query, asPath }) => {

    const page = query.slug ? await api.getPageBySlug(query.slug) : await api.getHomePage()
    
    if(!isServer()) console.log('Page:', page);
    
    return { page }
}
  

export default Index