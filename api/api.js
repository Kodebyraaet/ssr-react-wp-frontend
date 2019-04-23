import fetch from 'isomorphic-unfetch'

import { buildQueryString } from '../lib/helpers'

const api = {

    /*
    |--------------------------------------------------------------------------
    |  isomorphic-unfetch request wrapper
    |--------------------------------------------------------------------------
    */
    fetch: async (query, fetchOptions = {}) => {
        const queryString = buildQueryString(query)
        const url = `${process.env.API_BASE}/wp-content/themes/react/inc/api/${queryString}`
        
        //console.log('API CALL: ', url);
        
        try {
            return await (await fetch(url, fetchOptions)).json();
        } catch (error) {
            return null
        }
    },

    get: async (action, params = {}, fetchOptions = {}) => {
        const query = { action, ...params, lang: params.lang || '' }
        return api.fetch(query, fetchOptions)
    },    
}

export default api;