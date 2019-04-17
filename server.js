const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const routes = require('./routes')

app
    .prepare()
    .then(() => {
        const server = express()

        routes.forEach(({ path, page, query }) => {

            server.get(path, (req, res) => {
                app.render(req, res, page, query(req))
            })

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