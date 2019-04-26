import fetch from 'isomorphic-unfetch'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { buildQueryString } from '../lib/helpers'

import { setMenu, setWp, setLang } from '../store'

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

    /*
    |--------------------------------------------------------------------------
    |  Generic GET request
    |--------------------------------------------------------------------------
    */
    get: async (action, params = {}, fetchOptions = {}) => {
        const query = { action, ...params, lang: params.lang || '' }
        return api.fetch(query, fetchOptions)
    },   

    /*
    |--------------------------------------------------------------------------
    |  Get minimal ammount of data required for each page
    |--------------------------------------------------------------------------
    */
    initPage: async ({ query, store }) => {

        let storeState = store.getState()

        // get wp config (if not in store) and save it to global store
        if(!storeState.wp) {
            const wp = await api.get('config', { lang: query.lang || '' })
            store.dispatch(setWp(wp))
            storeState = store.getState()
            if(!storeState.wp) return false
        }

        // set language (based on store and query) in global store
        const lang = query.lang || storeState.wp.default_language
        if(lang !== storeState.lang) {
            store.dispatch(setLang(lang))
            storeState = store.getState()
        }

        // get main menu (if not in store) and save it to global store
        const location = 'primary-menu'
        const menuInStore = lang ? 
                            (storeState && storeState.menus[lang] && storeState.menus[lang][location]) 
                            :
                            (storeState && storeState.menus[location])
        if(!menuInStore) {
            const menu = await api.get('menu', { location, lang })
            store.dispatch(setMenu({ menu, location, lang }))
            storeState = store.getState()
        }

        // check if page preview requested
        const previewRequested = (query.preview && 
                                query.id && 
                                query.nonce && 
                                query.type) ? true : false

        return { 
            lang: storeState.lang, 
            wp: storeState.wp,
            menus: storeState.menus,
            previewRequested
        }
    }
    
    
    
}

export default api;