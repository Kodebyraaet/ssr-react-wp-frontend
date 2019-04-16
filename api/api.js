import fetch from 'isomorphic-unfetch'

import { buildQueryString } from 'lib/helpers'

const base = 'http://localhost:8080'

const api = {

    get: async query => {
        const queryString = buildQueryString(query)
        const res = await fetch(`${base}/wp-content/themes/react/inc/api/${queryString}`)
        const data = await res.json()

        return data
    },

    getHomePage: async (lang) => {

        let homePageId = 5;
        if(lang === 'pl') homePageId = 33;
        
        const data = await api.get({
            action: 'page',
            id: homePageId,
        })

        if(data && data.error) return null;

        return Array.isArray(data) ? data[0] : data
    },

    getPageBySlug: async (slug, lang) => {

        const data = await api.get({
            action: 'page',
            post_name: slug,
            lang: lang,
        })

        if(data && data.error) return null;

        return Array.isArray(data) ? data[0] : data
    },

    getMenuByLocation: async (location, lang) => {

        const data = await api.get({
            action: 'menu',
            location: location,
            lang: lang,
        })

        if(data && data.error) return null;

        return data
    }

}

export default api;