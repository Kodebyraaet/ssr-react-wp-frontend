const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
    .prepare()
    .then(() => {
        const server = express()

        const defaultLang = 'en'

        server.get('/', (req, res) => {
            const actualPage = '/'
            const queryParams = { lang: defaultLang }
            app.render(req, res, actualPage, queryParams)
        })

        server.get('/pl', (req, res) => {
            const actualPage = '/'
            const queryParams = { lang: 'pl' }
            app.render(req, res, actualPage, queryParams)
        })

        server.get('/pl/:slug', (req, res) => {
            const actualPage = '/'
            const queryParams = { lang: 'pl', slug: req.params.slug }
            app.render(req, res, actualPage, queryParams)
        })

        server.get('/:slug', (req, res) => {
            const actualPage = '/'
            const queryParams = { lang: defaultLang, slug: req.params.slug }
            app.render(req, res, actualPage, queryParams)
        })

        server.get('/pl/:parent/:slug', (req, res) => {
            const actualPage = '/'
            const queryParams = { lang: 'pl', slug: req.params.slug, parent: req.params.parent }
            app.render(req, res, actualPage, queryParams)
        })

        server.get('/:parent/:slug', (req, res) => {
            const actualPage = '/'
            const queryParams = { lang: defaultLang, slug: req.params.slug, parent: req.params.parent }
            app.render(req, res, actualPage, queryParams)
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(3000, err => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch(ex => {
        console.error(ex.stack)
        process.exit(1)
    })