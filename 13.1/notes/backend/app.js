require('dotenv').config()

const config = require('./utils/config')

const express = require('express')

//const mongoose = require('mongoose')

const { Sequelize, Model, DataTypes } = require('sequelize')

const app = express()

require('express-async-errors')

const cors = require('cors')

const notesRouter = require('./controllers/notes')

const usersRouter = require('./controllers/users')

const loginRouter = require('./controllers/login')

const middleware = require('./utils/middleware')

const logger = require('./utils/logger')

logger.info('app.js')

//logger.info('MONGODB', config.MONGODB_URI)

/*
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error in connection to MongoDB:', error.message)
  })
*/

const main = async () => {

  try {

    await sequelize.authenticate()

    console.log('Connection established successfully.')
    
    const notes = await sequelize.query("SELECT * FROM notes", { type: QueryTypes.SELECT })
    
    console.log(notes)
    
    sequelize.close()

  } catch (error) {

    console.error('Unable to connect to the database:', error)
  }
}

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(notesRouter)
app.use(usersRouter)
app.use(loginRouter)
app.use(middleware.requestLogger)
app.use(middleware.errorHandler)

main()

module.exports = app