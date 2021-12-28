// $ npm install --save sequelize

// $ npm install --save sequelize-cli

// $ npm install --save pg

// $ npm install --save dotenv

// $ npm install --save curl

// $ heroku config

// DATABASE_URL=postgres://<USER_NAME>@<HOST_NAME>:5432/<DATA_BASE>

// $ npm install umzug --save

// $ npm install move --save

const { Sequelize, Model, DataTypes } = require('sequelize')

//const { Umzug, SequelizeStorage } = require('umzug');

const Umzug = require('umzug')

//const move = require('move')

const { DB_HOST, DB_PORT, POSTGRES_PASSWORD, DB_USER, DB_SCHEMA } = require('./config')

const logger = require('../utils/logger')

logger.info('DB_HOST', DB_HOST, 'DB_PORT', DB_PORT)

const sequelize = new Sequelize( 
  DB_SCHEMA,
  DB_USER,
  POSTGRES_PASSWORD,{
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
})

const runMigrations = async () => {

  logger.info('runMigrations')

  const migrator = new Umzug({
    storage: 'sequelize',
    storageOptions: {
      sequelize,
      tableName: 'migrations',
    },
    migrations: {
      params: [sequelize.getQueryInterface()],
      path: `${process.cwd()}/migrations`,
      pattern: /\.js$/,
    },
  })

  const migrations = await migrator.up()

  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.file),
  })
}

/*const runMigrations = async () => {

  logger.info('runMigrations')

  const migrator = new Umzug({
    //storage: 'sequelize',
    storage: new SequelizeStorage({ sequelize }),
    storageOptions: {
      sequelize,
      tableName: 'migrations',
    },
    migrations: {
      params: [sequelize.getQueryInterface()],
      path: `${process.cwd()}/migrations`,
      pattern: /\.js$/,
    },
  })

  const migrations = await migrator.up()

  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.file),
  })
}
*/

/*
const runMigrations = async () => {

  logger.info('runMigrations')

  const migrator = new move({
    storage: 'sequelize',
    storageOptions: {
      sequelize,
      tableName: 'migrations',
    },
    migrations: {
      params: [sequelize.getQueryInterface()],
      path: `${process.cwd()}/migrations`,
      pattern: /\.js$/,
    },
  })

  const migrations = await migrator.up()

  console.log('Migrations up to date', {
    files: migrations.map((migration) => migration.file),
  })
}
*/

/*
const runMigrations = async () => {

  const migrator = new migration(migrationConf)

  const migrations = await migrator.up()

  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.file),
  })
}
*/

const migrationConf = {
  storage: 'sequelize',
  //storage: new SequelizeStorage({ sequelize }),
  storageOptions: {
    sequelize,
    tableName: 'migrations',
  },
  migrations: {
    params: [sequelize.getQueryInterface()],
    path: `${process.cwd()}/migrations`,
    pattern: /\.js$/,
  },
}

const rollbackMigrations = async () => {

  logger.info('rollbackMigration')

  await sequelize.authenticate()

  //const migrator = new move(migrationConf)

  const migrator = new Umzug(migrationConf)

  await migrator.down()
}

const connect = async () => {

  logger.info('Connect to database.')

  try {

    await sequelize.authenticate()

    await runMigrations()

    console.log(`${DB_HOST} connected.`)

  } catch (error) {

    console.error('Error: Connecting database failed.', error)

    return process.exit(1)
  }

  //return null
}

module.exports = { connect, sequelize, rollbackMigrations }
