import React, { Component } from 'react'
import Head from 'next/head'

import colors from 'css/colors'

class HeadMeta extends Component {

    toString(value) {
        if(!value) return '';
        if(value === 'null') return '';
        return value;
    }

    seoValue(key) {
        const { acf } = this.props.page
        return (acf && acf[`seo_${key}`]) ? this.toString(acf[`seo_${key}`]) : ''
    }

    getTitle() {
        const title = this.seoValue('title') || this.props.page.title.rendered
        return <title>{title}</title>
    }

    getDescription() {
        const description = this.seoValue('description')
        return description ? <meta name="description" content={description} /> : null
    }

    getKeyWords() {
        const keywords = this.seoValue('keywords')
        return keywords ? <meta name="keywords" content={keywords} /> : null
    }

    getOpenGraphLink() {
        const { link } = this.props.page
        return link ? <meta property="og:url" content={link} /> : null
    }

    getOpenGraphTitle() {
        const title = this.seoValue('title') || this.props.page.title.rendered
        return title ? <meta property="og:title" content={title} /> : null
    }

    getOpenGraphDescription() {
        const description = this.seoValue('description')
        return description ? <meta property="og:description" content={description} /> : null
    }

    getOpenGraphImage() {
        const image = this.seoValue('facebook_image')
        return image ? <meta property="og:image" content={image.url} /> : null
    }

    getTwitterTitle() {
        const title = this.seoValue('title') || this.props.page.title.rendered
        return title ? <meta property="twitter:title" content={title} /> : null
    }

    getTwitterDescription() {
        const description = this.seoValue('description')
        return description ? <meta property="twitter:description" content={description} /> : null
    }

    render() {
        const { page } = this.props

        if(!page) return null

        
        return(
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/static/favicon.ico" />
                <link rel="manifest" href="/static/manifest.json" />
                {this.getTitle()}
                {this.getDescription()}
                {this.getKeyWords()}
                {this.getOpenGraphLink()}
                {this.getOpenGraphTitle()}
                {this.getOpenGraphDescription()}
                {this.getOpenGraphImage()}
                {this.getTwitterTitle()}
                {this.getTwitterDescription()}
            </Head>
        )
    }
}

export default HeadMeta;