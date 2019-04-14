import React from 'react';
import { withRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'

import Layout from 'components/Layout.js'

const Index = withRouter( ({ router, page }) => {

    if(!page) return null;

    return(
        <Layout>
            <h3>{page.title.rendered}</h3>
        </Layout>
    )
})

Index.getInitialProps = async ({ pathname, query, asPath }) => {

    // for better SEO we should load main menu here. If we do, Header needs to be moved form Layout to Index

    // load page data
    const homePageId = 2;
    const url = `http://wp-headless.local/wp-json/wp/v2/pages/${query.slug ? `?slug=${query.slug}` : homePageId}`
    const res = await fetch(url)
    const data = await res.json()
    const page = Array.isArray(data) ? data[0] : data

    return { page }
}
  

export default Index