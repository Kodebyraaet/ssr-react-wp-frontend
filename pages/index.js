import React from 'react';
import { withRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'

import Layout from 'components/Layout.js'
import { buildQueryString } from 'lib/helpers'

const Index = withRouter( ({ router, page }) => {

    if(!page) return null;

    return(
        <Layout>
            <h3>{page.title.rendered}</h3>
            <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
        </Layout>
    )
})

Index.getInitialProps = async ({ pathname, query, asPath }) => {

    // for better SEO we should load main menu here. If we do, Header needs to be moved form Layout to Index

    // load page data
    const homePageId = 5;
    //const url = `http://localhost:8080/wp-json/wp/v2/pages/${query.slug ? `?slug=${query.slug}` : homePageId}`
    let options = {
        action: 'fetchPages'
    }
    if(query.slug) {
        options.post_name = query.slug
    } else {
        options.id = homePageId
    }
    const url = `http://localhost:8080/wp-content/themes/react/inc/api/${buildQueryString(options)}`
    
    const res = await fetch(url)
    const data = await res.json()

    console.log(data);
    const page = Array.isArray(data) ? data[0] : data

    return { page }
}
  

export default Index