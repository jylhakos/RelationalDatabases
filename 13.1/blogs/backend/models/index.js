const logger = require('./utils/logger')

const Note = require('./blog')

const User = require('./user')

logger.info('Blog.sync()')

Blog.sync()

logger.info('User.sync()')

User.sync()

module.exports = {
  Blog, User
}