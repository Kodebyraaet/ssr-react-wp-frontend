import fetch from 'isomorphic-unfetch'

const base = 'http://wp-headless.local'

const api = {

    getMenuByLocation: async location => {
        const res = await fetch(`${base}/wp-json/react/menu/${location}`)
        const data = await res.json()
        return data
    }

}

export default api;