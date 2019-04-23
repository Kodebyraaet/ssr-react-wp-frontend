module.exports = [
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
        path: '/_preview/:id/:nonce', 
        page: '/', 
        query: req => ({ preview: true, id: req.params.id, nonce: req.params.nonce }) 
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