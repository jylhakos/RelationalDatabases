require('dotenv').config()

let PORT = process.env.PORT | 3001

let DB_HOST = process.env.DB_HOST | 'localhost'

let DB_PORT = process.env.DB_PORT | 5432

let POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD | 'postgres'

let DB_USER = process.env.DB_USER | 'postgres'

let SECRET = process.env.SECRET

console.log('DB_HOST', DB_HOST, 'DB_PORT', DB_PORT)

module.exports = {
  PORT,
  DB_HOST,
  DB_PORT,
  POSTGRES_PASSWORD,
  DB_USER,
  SECRET
}

/*
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  PORT
}
*/