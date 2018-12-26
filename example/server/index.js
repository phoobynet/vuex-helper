const jsonServer = require('json-server')
const server = jsonServer.create()
const fakeCustomers = require('./faker')()
const router = jsonServer.router(fakeCustomers)
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}))
server.use(jsonServer.bodyParser)
server.use(router)

const PORT = 5001

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}...`)
})