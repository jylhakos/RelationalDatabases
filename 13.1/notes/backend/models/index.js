const logger = require('./utils/logger')

const Note = require('./note')

const User = require('./user')

logger.info('Note.sync()')

Note.sync()

logger.info('User.sync()')

User.sync()

module.exports = {
  Note, User
}