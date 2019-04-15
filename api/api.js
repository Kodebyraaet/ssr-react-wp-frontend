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

    getHomePage: async () => {

        const homePageId = 5;
        
        const data = await api.get({
            action: 'fetchPages',
            id: homePageId,
        })

        return Array.isArray(data) ? data[0] : data
    },

    getPageBySlug: async slug => {

        const data = await api.get({
            action: 'fetchPages',
            post_name: slug,
        })

        return Array.isArray(data) ? data[0] : data
    },

    getMenuByLocation: async location => {
        const res = await fetch(`${base}/wp-json/react/menu/${location}`)
        const data = await res.json()

        return data
    }

}

export default api;