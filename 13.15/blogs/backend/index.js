// $ export NODE_ENV=production

const app = require('./app')

const http = require('http')

const { PORT } = require('./utils/config')

const { connect } = require('./utils/database')

const logger = require('./utils/logger')

const server = http.createServer(app)

const start = async () => {

  await connect()

  server.listen(PORT, () => {

    logger.info(`Server listens on port ${PORT}`)
  
  })
}

start()