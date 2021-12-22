// $ export NODE_ENV=production

const http = require('http')


const express = require('express')

require('express-async-errors')

const { Sequelize, Model, DataTypes } = require('sequelize')

const app = express()

const cors = require('cors')

require('dotenv').config()

const { PORT } = require('./utils/config')

const { connect } = require('./utils/database')

const logger = require('./utils/logger')

const config = require('./utils/config')

const blogsRouter = require('./controllers/blogs')

const middleware = require('./utils/middleware')

const Blog = require('./models/blog')

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api', blogsRouter)
app.use(middleware.requestLogger)
app.use(middleware.errorHandler)

const server = http.createServer(app)

const query = async (syntax) => {

  console.log('postgres', syntax)

  try {

    const sequelize = new Sequelize(
      process.env.DB_SCHEMA || 'postgres',
      process.env.DB_USER || 'postgres',
      process.env.POSTGRES_PASSWORD || 'postgres',
      {
          host: process.env.DB_HOST || 'localhost',
          port: process.env.DB_PORT || 5432,
          dialect: 'postgres',
          dialectOptions: {
              ssl: process.env.DB_SSL == "true",
              rejectUnauthorized: false
      }
    })

    await sequelize.authenticate()

    console.log('Connection has been established successfully.')

    const blogs = await Blog.findAll()

    blogs.forEach(
      function(blog) {

        const record = blog.dataValues

        console.log(record.author, record.title, record.likes)
      }
    )

    //console.log(JSON.stringify(blogs))

    sequelize.close()

  } catch (error) {

    console.error('Unable to connect to the database:', error)
  }
}

const start = async () => {

  //await connect()

  await query("SELECT * FROM blogs")

  server.listen(PORT, () => {
    logger.info(`Server listens on port ${PORT}`)
  })
}

start()