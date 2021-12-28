const User = require('./user')

const Session = require('./session')

const Blog = require('./blog')

const Reading = require('./reading')

const logger = require('../utils/logger')

User.hasMany(Blog)

Session.belongsTo(User)

Blog.belongsTo(User)

Reading.belongsTo(Blog)

logger.info('User.sync()')

User.sync()

logger.info('Session.sync()')

Session.sync()

logger.info('Blog.sync()')

Blog.sync()

logger.info('Reading.sync()')

Reading.sync()

module.exports = { 
  User,
  Session,
  Blog,
  Reading
}