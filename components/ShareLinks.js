import React from 'react'

import { urlEncode } from '../lib/helpers'

export const FacebookShareLink = props => {
    const url = urlEncode(props.url)
    const title = urlEncode(props.title)
    return <a 
        href={'https://www.facebook.com/sharer.php?u=&t='} 
        target="_blank" 
        className={props.className}
        onClick={e => { 
            window.open('https://www.facebook.com/sharer/sharer.php?u=' + url + '&t=' + title, 'sharer', 'toolbar=0,status=0,width=626,height=436'); 
            e.preventDefault();
        }}  
        title="Share on Facebook"
    >Facebook</a> 
}

export const TwitterShareLink = props => {
    const url = urlEncode(props.url)
    const title = urlEncode(props.title)

    return <a 
        href={'https://twitter.com/intent/tweet?'} 
        target="_blank" 
        className={props.className}
        onClick={e => { 
            window.open('https://twitter.com/intent/tweet?text='+title+':%20 '+url, 'sharer', 'toolbar=0,status=0,width=626,height=436'); 
            e.preventDefault();
        }}  
        title="Tweet"
    >Twitter</a> 
}

