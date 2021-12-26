require('dotenv').config()

const PORT = parseInt(process.env.PORT,10) || 3001

const DB_HOST = String(process.env.DB_HOST) || 'localhost'

const DB_PORT = parseInt(process.env.DB_PORT,10) || 5432

const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'postgres'

const DB_USER = process.env.DB_USER || 'postgres'

const DB_SCHEMA = process.env.const || 'postgres'

const SECRET = process.env.SECRET || 'secret'

console.log('PORT', PORT, 'DB_HOST', DB_HOST, 'DB_PORT', DB_PORT)

module.exports = {
  PORT,
  DB_HOST,
  DB_PORT,
  POSTGRES_PASSWORD,
  DB_USER,
  SECRET
}
