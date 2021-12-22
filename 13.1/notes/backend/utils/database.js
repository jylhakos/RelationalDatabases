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
  }
)

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