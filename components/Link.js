import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'

import { buildQueryString } from '../lib/helpers'

export default withRouter(connect(({wp}) => ({wp}))(({ wp, to, title, children, prefetch, className, ...rest }) => {

    if(!to) return null

    const isExternalLink = (to && to != '/' && to != '#' && !to.includes(wp.site_url) && to.includes('http'))
    if (isExternalLink) return <a className={className} {...rest} rel="noopener" href={to} title={title}>{children || title}</a>

    const { link, path, query, queryString } = parseLink(to, wp)

    if(rest.router.asPath === path) {
        className = ((className || '') + ' active').trim()
    }

    return (
        <Link prefetch={prefetch} as={path} href={`/${queryString}`} >
            <a className={className} >
                {children || title}
            </a>
        </Link>
    )
}))

const parseLink = (link, wp) => {

    let blogBase = wp.blog_base.slug
    const postTypes = wp.post_types

    const path = link
                .replace(/^.*\/\/[^\/]+/, '') // remove domain
                .replace(/\?.+/, '') // reomve query string
                .replace(/\/$/, '') // remove last '/'
                || '/' // use '/' if path end up empty

    let fragments = path.split('/').filter(f => f)

    let query = {
        slug: '',
        parent: '',
        type: 'page',
        term: '',
        taxonomy: '',
        lang: '',
    }

    // match language code, store it in 'query' and remove from fragments
    const languageCodes = wp.languages
    if(fragments.length && ~languageCodes.indexOf(fragments[0])) {
        query.lang = fragments[0]
        fragments.shift() // remove language code from fragments
    }

    // if post link...
    if(fragments.length && fragments[0] === blogBase) {
        query.type = 'post'
        query.slug = fragments[fragments.length - 1]

        return { link, path, query, queryString: buildQueryString(query) }
    }

    // if custopm post type link...
    if(fragments.length && ~postTypes.indexOf(fragments[0])) {
        query.type = fragments[0]
        fragments.shift() // reomve post type from fragments
        if(fragments.length) {
            query.slug = fragments[fragments.length - 1]
            query.parent = fragments.length > 1 ? fragments[0] :''
        }

        return { link, path, query, queryString: buildQueryString(query) }
    }

    // looks like page link...
    if(fragments.length) {
        query.slug = fragments[fragments.length - 1]
        query.parent = fragments.length > 1 ? fragments[0] :''
    }

    return { link, path, query, queryString: buildQueryString(query) }
}

/*console.log(parseLink('http://wp-headless.local'));
console.log(parseLink('http://wp-headless.local/'));
console.log(parseLink('http://wp-headless.local/no'));
console.log(parseLink('http://wp-headless.local/no/'));
console.log(parseLink('http://wp-headless.local/sample-page'));
console.log(parseLink('http://wp-headless.local/no/sample-page'));
console.log(parseLink('http://wp-headless.local/parent-page/sample-page'));
console.log(parseLink('http://wp-headless.local/no/parent-page/sample-page'));
console.log(parseLink('http://wp-headless.local/employees'));
console.log(parseLink('http://wp-headless.local/no/employees'));
console.log(parseLink('http://wp-headless.local/employees/konrad'));
console.log(parseLink('http://wp-headless.local/no/employees/konrad'));*/
