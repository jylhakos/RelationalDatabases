// $ npm install --save sequelize

// $ npm install --save sequelize-cli

// $ npm install --save pg

// $ npm install --save dotenv

// $ npm install --save curl

// $ heroku config

// DATABASE_URL=postgres://<USER_NAME>@<HOST_NAME>:5432/<DATA_BASE>

const { Sequelize, Model, DataTypes } = require('sequelize')

const logger = require('./logger')

const { DB_HOST, DB_PORT, POSTGRES_PASSWORD, DB_USER, DB_SCHEMA } = require('./config')

logger.info('DB_HOST', DB_HOST, 'DB_PORT', DB_PORT)

const sequelize = new Sequelize(
  DB_SCHEMA,
  DB_USER,
  POSTGRES_PASSWORD,
  {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
    },
  })

/*
const sequelize = new Sequelize(DB_HOST, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
})
*/

const connect = async () => {

  try {

    await sequelize.authenticate()

    console.log(`${DB_HOST} connected.`)

  } catch (error) {

    console.error('Error: Connecting database failed.', error)

    return process.exit(1)
  }

  return null
}

module.exports = { connect, sequelize }
