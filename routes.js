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