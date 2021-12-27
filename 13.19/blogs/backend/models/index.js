const Blog = require('./blog')

const User = require('./user')

const logger = require('../utils/logger')

User.hasMany(Blog)

Blog.belongsTo(User)

logger.info('User.sync()')

User.sync()

logger.info('Blog.sync()')

Blog.sync()

module.exports = {
  Blog, User
}