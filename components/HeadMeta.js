import React from 'react'
import { Helmet } from "react-helmet"

const HeadMeta = props => {
    const { page } = props;

    if(!page) return null;

    if(page.yoast) {

        let title = page.yoast.title;
        if(!title && page.title && page.title.rendered) title = page.title.rendered;
        if(!title && page.post_title) title = page.post_title;

        let description = nullToEmptyString(page.yoast.description);

        if(page.type === 'author') {
            title = nullToEmptyString(page.yoast.author_title) ? page.yoast.author_title : page.first_name+' '+page.last_name;
            if(nullToEmptyString(page.yoast.author_desc)) description = page.yoast.author_desc;
        }

        //console.log('Yoast meta', page.yoast);

        return (
            <Helmet> 

                <title itemProp="name" lang="nb-NO">{title}</title>
                <meta name="description" content={description} />

                <meta property="og:url" content={nullToEmptyString(page.link)} />
                <meta property="og:title" content={nullToEmptyString(page.yoast.og_title)} />
                <meta property="og:description" content={nullToEmptyString(page.yoast.og_desc)} />
                <meta property="og:image" content={nullToEmptyString(page.yoast.og_image)} />

                <meta property="twitter:title" content={nullToEmptyString(page.yoast.twitter_title)} />
                <meta property="twitter:description" content={nullToEmptyString(page.yoast.twitter_desc)} />

                <meta name="keywords" content={nullToEmptyString(page.yoast.focuskw)} />

            </Helmet>
        )
    } else {
        console.log('"Yoast" meta not available for this page/post');
        return null;
    }
}

const nullToEmptyString = str => {
    if(!str) return '';
    if(str === 'null') return '';

    return str;
}

export default HeadMeta;