const Blog = require('./blog')

const User = require('./user')

const logger = require('../utils/logger')

logger.info('Blog.sync()')

Blog.sync()

logger.info('User.sync()')

User.sync()

module.exports = {
  Blog, User
}