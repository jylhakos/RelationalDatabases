const readingsRouter = require('express').Router()

const { sequelize } = require('../utils/database')

const { Op } = require('sequelize')

const jwt = require('jsonwebtoken')

const { SECRET } = require('../utils/config')

const { Reading, User } = require('../models')

const tokenExtractor = (request, response, next) => {

  console.log('tokenExtractor', SECRET)

  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    
    console.log('authorization', authorization)

    try {

      request.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    
      console.log('request.decodedToken', request.decodedToken)

    } catch(error) {

      console.log(JSON.stringify({ Error: 'token invalid' }))

      response.status(401).json({ Error: 'token invalid' })
    }
  }  else {

    console.log(JSON.stringify({ Error: 'token missing' }))

    response.status(401).json({ Error: 'token missing' })
  }

  next()
}

readingsRouter.post('/', async (request, response) => {

  const user_id = request.body.user_id

  const blog_id = request.body.blog_id
  
  console.log('readingsRouter.post', user_id, blog_id)

  const user_blog = new Reading({
    user_id,
    blog_id
  })

  const blog_state = await user_blog.save()

  console.log('blog_state', blog_state)

  response.json(blog_state)
})

readingsRouter.put('/:id', tokenExtractor, async (request, response) => {

  console.log('request.params.id', request.params.id, 'request', request, 'request.decodedToken', request.decodedToken)
  
  var where = {}

  try {

    const user = await User.findOne({ where: { username: request.decodedToken.username }})
    
    if (user) {

      where = {
        [Op.and]: [{ user_id: user.id }, { blog_id: request.params.id }]
      }

      console.log('user', user)

      const reading = await Reading.findOne({ where })
    
      console.log('reading', reading)
      
      if (reading) {

        const read = request.body.read

        console.log('request.body.read', read)

        const status = read == 'true' ? 'read' : 'unread'

        reading.state = status

        console.log('reading.state', status)

        await reading.save()

        response.json(reading)
      }

    }

  } catch(error) {

    console.error(error)

    return response.status(404).json({ error })
  }
})

module.exports = readingsRouter
