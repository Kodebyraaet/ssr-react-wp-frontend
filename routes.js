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
        path: '/:slug', 
        page: '/', 
        query: req => ({ slug: req.params.slug }) 
    },
    { 
        path: '/pl/:parent/:slug', 
        page: '/', 
        query: req => ({ lang: 'pl', slug: req.params.slug, parent: req.params.parent }) 
    },
    { 
        path: '/:parent/:slug', 
        page: '/', 
        query: req => ({ slug: req.params.slug, parent: req.params.parent }) 
    },
]