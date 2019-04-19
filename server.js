const express = require('express')
const next = require('next')
const cacheableResponse = require('cacheable-response')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handle = app.getRequestHandler()

const routes = require('./routes')

// server in memory caching
const ssrCache = cacheableResponse({
    ttl: 1000 * 60 * 60, // 1hour
    get: async ({ req, res, page, query }) => ({
      data: await app.renderToHTML(req, res, page, query)
    }),
    send: ({ data, res }) => res.send(data)
})

app.prepare().then(() => {
    const server = express()

    // default language does not use lang. code
    server.get('/en', (req, res) => res.redirect(301, '/') )

    // app routes
    routes.forEach(({ path, page, query }) => {
        server.get(path, (req, res) => {

            // no server in memory cache for DEV
            if(dev) {
                return app.render(req, res, page, query(req))
            }

            // for production only
            return ssrCache({ req, res, page, query: query(req) })
        })

    })

    server.get('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, err => {
        if (err) throw err
        console.log('> Ready on http://localhost:'+port)
    })

}).catch(ex => {
    console.error(ex.stack)
    process.exit(1)
})