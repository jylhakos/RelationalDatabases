const readingsRouter = require('express').Router()

const { sequelize } = require('../utils/database')

const { Reading } = require('../models')

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

module.exports = readingsRouter
