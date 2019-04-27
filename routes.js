const fs = require('fs')

// read now.json file
const nowConfig = JSON.parse(fs.readFileSync('now.json', 'utf8'))

/*
|--------------------------------------------------------------------------
|  Build routes object based on now.json routes
|--------------------------------------------------------------------------
| we only look at routes that have "headers": { "permalink": "true" } set
| neither Now nor Next does not require "permalink" in headers  but its "our" way
| for destinguishing Now routes that corespond to WordPress routes.
| We convert each now route to { path: '/', page: '/', query: req => ({}) } object
| languages and post types are paresed based on definitions below
*/

// language definitions (without default language)
const languages = ['pl']

// post type definitions & their translations
const types = [
    { slug: 'news', type: 'post', trans: { pl: 'posty' }},
    { slug: 'employees', type: 'employee', trans: { pl: 'pracownicy' }}
]

// create routes on=bject
const routes = nowConfig.routes
    .filter( ({ headers }) => headers && headers.permalink)
    .map( ({ src, dest, headers, status, methods }) => {

        // route rules based on now.json route "src" value
        const rules = src.replace(/\^\//g, '^FS') // replace ^/ with ^FS (so we can corectly explode by / )
                         .split('/') // split by /
                         .filter(part => part) // skip empty values
                         .map(part => part.replace(/\^FS/g, '^/')) // replace ^FS back to ^/
        
        // build request path that will be used by server
        const path = rules.reduce((path, rule) => {
            const queryVar = rule.match(/[a-z]+(?=>)/)
            return path += queryVar ? ('/:' + queryVar) : ('/' + rule)
        }, '')

        // set page that will be used by Next to handle the request 
        const page = dest.split('?')[0]

        // check what language we are dealing with
        const lang = ~languages.indexOf(rules[0]) ? languages[languages.indexOf(rules[0])] : ''

        // build query object
        const queryObject = rules.reduce((q, rule, i) => {
            const queryVar = rule.match(/[a-z]+(?=>)/)

            // query param  for preview
            if(i === 0 && rule === '_preview') q.preview = true

            //query param for language
            if(!q.lang && lang) q.lang = lang

            // query param for post type
            if(!lang && i === 0) {
                const matchedTypeObj = types.filter(obj => obj.slug === rule)[0]
                if(matchedTypeObj) q.type = matchedTypeObj.type
            } 
            if(lang && i === 1) {
                const matchedTypeObj = types.filter(obj => obj.trans[lang] && obj.trans[lang] === rule)[0]
                if(i === 1 && matchedTypeObj) q.type = matchedTypeObj.type
            }

            // query param for query var
            if(queryVar) q[queryVar] = queryVar[0]
        
            return q
        }, {})//query: req => ({ lang: 'pl', slug: req.params.slug, parent: req.params.parent }) 

        // query function
        const query = req => {
            return Object.keys(queryObject).reduce((params, key) => {
                params[key] = req.params[queryObject[key]] || queryObject[key]
                return params
            }, {})
        }

        return { src, path, page, queryObject, query  }
})

//console.log(routes)

module.exports = routes

const oldRoutes = [
    {  
        path: '/', 
        page: '/', 
        query: req => ({}) 
    },
    {   
        path: '/pl', 
        page: '/', 
        query: req => ({ lang: 'pl' }) 
    },
    { 
        path: '/pl/posty/:slug', 
        page: '/', 
        query: req => ({ lang: 'pl', slug: req.params.slug, type: 'post' }) 
    },
    { 
        path: '/pl/:slug', 
        page: '/', 
        query: req => ({ lang: 'pl', slug: req.params.slug }) 
    },
    { 
        path: '/pl/:parent/:slug', 
        page: '/', 
        query: req => ({ lang: 'pl', slug: req.params.slug, parent: req.params.parent }) 
    },
    { 
        path: '/_preview/:type/:id/:nonce/:image', 
        page: '/', 
        query: req => ({ preview: true, type: req.params.type, id: req.params.id, nonce: req.params.nonce, image: req.params.image }) 
    },
    { 
        path: '/news/:slug', 
        page: '/', 
        query: req => ({ slug: req.params.slug, type: 'post' }) 
    },
    { 
        path: '/:slug', 
        page: '/', 
        query: req => ({ slug: req.params.slug }) 
    },
    { 
        path: '/:parent/:slug', 
        page: '/', 
        query: req => ({ slug: req.params.slug, parent: req.params.parent }) 
    },
]