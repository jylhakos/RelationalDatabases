const Blog = require('./blog')

const logger = require('../utils/logger')

logger.info('Blog.sync()')

Blog.sync()

module.exports = {
  Blog
}