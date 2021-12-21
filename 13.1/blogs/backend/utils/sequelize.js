// $ npm install --save sequelize

// $ npm install --save sequelize-cli

// $ npm install --save pg

// $ npm install --save dotenv

// $ npm install --save curl

// $ heroku config

// DATABASE_URL=postgres://<USER_NAME>@<HOST_NAME>:5432/<DATA_BASE>

const Sequelize = require('sequelize')

const logger = require('./utils/logger')

const { DATABASE_URL } = require('./config')

logger.info('DATABASE_URL', DATABASE_URL)

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
})

const connect = async () => {

  try {

    await sequelize.authenticate()

    console.log(`${DATABASE_URL} connected`)

  } catch (error) {

    console.error('Connecting database failed.')

    return process.exit(1)
  }

  return null
}

module.exports = { connect, sequelize }

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
