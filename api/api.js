import fetch from 'isomorphic-unfetch'

import { buildQueryString } from 'lib/helpers'

const api = {

    /*
    |--------------------------------------------------------------------------
    |  generic API GET request
    |--------------------------------------------------------------------------
    */
    get: async query => {
        const queryString = buildQueryString(query)
        const res = await fetch(`${process.env.API_BASE}/wp-content/themes/react/inc/api/${queryString}`)
        const data = await res.json()

        return data
    },

    /*
    |--------------------------------------------------------------------------
    |  Get WP config
    |--------------------------------------------------------------------------
    */
    getWp: async () => {

        const data = await api.get({ action: 'config'})

        if(data && data.error) return null;

        return data
    },

    /*
    |--------------------------------------------------------------------------
    |  Get home page
    |--------------------------------------------------------------------------
    */
    getHomePage: async ({ id }) => {
        
        const data = await api.get({
            action: 'page',
            id: id,
        })

        if(data && data.error) return null;

        return Array.isArray(data) ? data[0] : data
    },

    /*
    |--------------------------------------------------------------------------
    |  Get page by slug
    |--------------------------------------------------------------------------
    */
    getPageBySlug: async ({ slug, lang }) => {

        const data = await api.get({
            action: 'page',
            post_name: slug,
            lang: lang || '',
        })

        if(data && data.error) return null;

        return Array.isArray(data) ? data[0] : data
    },

    /*
    |--------------------------------------------------------------------------
    |  Get menu by menu location
    |--------------------------------------------------------------------------
    */
    getMenuByLocation: async ({ location, lang }) => {

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