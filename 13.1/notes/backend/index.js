const app = require('./app')

const http = require('http')

const config = require('./utils/config')

const logger = require('./utils/logger')

const { PORT } = require('./utils/config')

const { connect } = require('./utils/database')

const server = http.createServer(app)

const start = async () => {

  await connect()

  server.listen(PORT, () => {

    logger.info(`Server listens on port ${PORT}`)
  
  })
}

start()