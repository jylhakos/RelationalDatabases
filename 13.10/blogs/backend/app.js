// $ heroku config:set DATABASE_URL=""

const config = require('./utils/config')

const express = require('express')

require('express-async-errors')

const { Sequelize, Model, DataTypes } = require('sequelize')

const app = express()

const cors = require('cors')

require('dotenv').config()

const blogsRouter = require('./controllers/blogs')

const usersRouter = require('./controllers/users')

const loginRouter = require('./controllers/login')

const middleware = require('./utils/middleware')

const logger = require('./utils/logger')

logger.info('app.js')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api', blogsRouter)
app.use('/api', usersRouter)
app.use('/api', loginRouter)
app.use(middleware.requestLogger)
app.use(middleware.errorHandler)

module.exports = app
