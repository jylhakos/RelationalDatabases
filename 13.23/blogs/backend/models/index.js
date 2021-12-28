const Blog = require('./blog')

const User = require('./user')

const Reading = require('./reading')

const logger = require('../utils/logger')

Blog.belongsTo(User)

User.hasMany(Blog)

Reading.belongsTo(Blog)

logger.info('User.sync()')

User.sync()

logger.info('Blog.sync()')

Blog.sync()

logger.info('Reading.sync()')

Reading.sync()

module.exports = {
  Blog, 
  User, 
  Reading
}