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

const logoutRouter = require('./controllers/logout')

const authorsRouter = require('./controllers/authors')

const readingsRouter = require('./controllers/readings')

const middleware = require('./utils/middleware')

const logger = require('./utils/logger')

const baseUrlBlogs = '/api/blogs'

const baseUrlUsers = '/api/users'

const baseUrlLogin = '/api/login'

const baseUrlLogout = '/api/logout'

const baseUrlAuthors = '/api/authors'

const baseUrlReadings = '/api/readinglists'

logger.info('app.js')

app.use(cors())

app.use(express.static('build'))

app.use(express.json())

app.use(middleware.tokenExtractor)

app.use(baseUrlBlogs, blogsRouter)

app.use(baseUrlUsers, usersRouter)

app.use(baseUrlLogin, loginRouter)

app.use(baseUrlLogout, logoutRouter) 

app.use(baseUrlAuthors, authorsRouter)

app.use(baseUrlReadings, readingsRouter)

app.use(middleware.requestLogger)

app.use(middleware.errorHandler)

module.exports = app
