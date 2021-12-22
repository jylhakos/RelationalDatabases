
const config = require('./utils/config')

const express = require('express')

require('express-async-errors')

const { Sequelize, Model, DataTypes } = require('sequelize')

const app = express()

const cors = require('cors')

require('dotenv').config()

//const mongoose = require('mongoose')

const blogsRouter = require('./controllers/blogs')

const usersRouter = require('./controllers/users')

const loginRouter = require('./controllers/login')

const middleware = require('./utils/middleware')

const logger = require('./utils/logger')

logger.info('app.js')

const exercise = async (title) => {

  console.log('exercise', title)

  try {

    const sequelize = new Sequelize(process.env.DB_SCHEMA || 'postgres',
      process.env.DB_USER || 'postgres',
      process.env.POSTGRES_PASSWORD || 'postgres',
      {
          host: process.env.DB_HOST || 'localhost',
          port: process.env.DB_PORT || 5432,
          dialect: 'postgres',
          dialectOptions: {
              ssl: process.env.DB_SSL == "true"
      }
    })

    await sequelize.authenticate()

    console.log('Connection has been established successfully.')

    const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })

    console.log(blogs)

    sequelize.close()

  } catch (error) {

    console.error('Unable to connect to the database:', error)
  }
}

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api', blogsRouter)
app.use('/api', usersRouter)
app.use('/api', loginRouter)
app.use(middleware.requestLogger)
app.use(middleware.errorHandler)

// exercise('13.3')

module.exports = app

//console.log('MONGODB', config.MONGODB_URI)

//logger.info('MONGODB', config.MONGODB_URI)

//mongoose.set('useCreateIndex', true)

/*
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error in connection to MongoDB:', error.message)
  })
*/

//mongoose.set('useFindAndModify', false)

//logger.info('process.env.DATABASE_URL', process.env.DATABASE_URL)

/*
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
})
*/

/* const sequelize = new Sequelize(
          process.env.DB_SCHEMA || 'postgres',
          process.env.DB_USER || 'postgres',
          process.env.POSTGRES_PASSWORD || 'postgres',
          {
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 5432,
            dialect: 'postgres',
              dialectOptions: {
                ssl: {
                  require: true,
                  rejectUnauthorized: false
                }
            },
          })
*/
