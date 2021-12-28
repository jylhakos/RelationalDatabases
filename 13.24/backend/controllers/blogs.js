const blogsRouter = require('express').Router()

const jwt = require('jsonwebtoken')

const { Op } = require('sequelize')

const { SECRET } = require('../utils/config')

const { User, Session, Blog } = require('../models')

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

const blogFinder = async (request, response, next) => {

  request.blog = await Blog.findByPk(request.params.id)

  next()
}

blogsRouter.get('/', async (request, response) => {
  
  console.log('blogsRouter.get /blogs')

  var where = {}

  if (request.query.search) {

    console.log('request.query.search', request.query.search)

    /*
    where.title = {
      [Op.substring]: request.query.search
    }
    */

    /*
    where = {
      [Op.or]: [{title: request.query.search}, {author: request.query.search}]
    }
    */

    where = { 
      [Op.or]: [
        {
          title: {
            [Op.like]: '%' + request.query.search + '%' 
          }
        },
        {
          author: {
            [Op.like]: '%' + request.query.search + '%'
          }
        }
      ]
    }
  }

  const blogs = await Blog.findAll({
    //attributes: { exclude: ['userId'] },
    attributes: { exclude: ['user_id'] },
    include: {
      model: User,
      attributes: ['id', 'name', 'username']
    },
    order: [
      ['likes','DESC']
    ],
    where
  })

  console.log(JSON.stringify(blogs))
  
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {

  console.log('blogsRouter.get', request.params.id)

  try {

    const blog = await Blog.findByPk(request.params.id)

    if (blog) {

      console.log(blog.toJSON())

      response.json(blog)

    } else {

      console.log('Blog not found', request.params.id)

      response.status(404).end()
    }

  } catch(error) {

    console.error(error)

    return response.status(404).json({ error })
  }
})

blogsRouter.put('/:id', async (request, response) => {

  console.log('request.body', request.body, 'request.params.id', request.params.id)

  try {

    console.log('request.body.user', request.body.user)

    const user = request.body.user

    console.log('user', user)

    if (user) {

      console.log('user.id', user.id)

      const user_id = user.id

      const session = await Session.findOne({ where: {
          user_id: user_id
        }
      })

      if (session.state === false) {
        console.error('Error: session expired.')
        return response.status(404).json({
          error: 'Error: session expired.'
        })
      }

      var blog = await Blog.findByPk(request.params.id)

      if (blog) {

        console.log('request.body.likes', request.body.likes)

        blog.likes = request.body.likes

        await blog.save()

        var blogLikes = blog.dataValues

        blogLikes.user = user

        console.log('blogLikes', blogLikes)

        response.json(blogLikes)

      } else {

        response.status(404).end()
      }

    } else {

      response.status(404).end()

    }

  } catch(error) {

    return response.status(404).json({ error })
  }
})

blogsRouter.post('/', tokenExtractor, async (request, response) => {

  console.log('request.body', request.body, 'request.decodedToken', request.decodedToken)
  
  try {

    const user = await User.findOne({ where: { username: request.decodedToken.username }})

    if (user) {

      console.log('user.dataValues.id', user.dataValues.id)

      const user_id = parseInt(user.dataValues.id)

      var where = {
        user_id: {
          [Op.eq]: user_id
        }
      }

      const session = await Session.findOne({where})

      if (session.state === false) {
        console.error('Error: session expired.')
        return response.status(404).json({
          error: 'Error: session expired.'
        })
      }

      //blog = await Blog.create({ ...request.body, userId: user.id })

      blog = await Blog.create({ ...request.body, user_id: user.id })

      //console.log('blog', blog, 'user', user)

      //const blog = Blog.build(request.body)

      //blog.author = 'unknown'

      //await blog.save()

      var blogUser = blog.dataValues

      blogUser.user = user.dataValues

      console.log('blogUser', blogUser)

      response.json(blogUser)

    }

  } catch(error) {

    console.log(error)

    return response.status(400).json({ error })
  }
})

blogsRouter.delete('/:id', tokenExtractor, async (request, response) => {

  console.log('blogsRouter.delete', request.params.id)

  if(request.token && SECRET) {

    console.log('request.token', request.token, 'request.decodedToken', request.decodedToken)

    if (!request.token || !request.decodedToken.username) {

      console.error('token missing or invalid')
    
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    //user = await User.findById(decodedToken.username)

    const user = await User.findOne({ where: { username: request.decodedToken.username }})

    if (user) {

      const user_id = user.dataValues.id

      const session = await Session.findOne({ where: {
          user_id: user_id
        }
      })

      if (session.state === false) {
        console.error('Error: session expired.')
        return response.status(404).json({
          error: 'Error: session expired.'
        })
      }

      const blog = await Blog.findByPk(request.params.id)

      //console.log('blog.userId', blog.userId)

      console.log('blog.user_id', blog.user_id)

      //if (blog.userId.toString() !== user.id.toString()) {
      if (blog.user_id.toString() !== user.id.toString()) {

        console.error('Error: only the creator can delete blogs')

        return response.status(401).json({ error: 'only the creator can delete blogs' })
      }

      await blog.destroy()

      response.status(204).end()

    } else {

      return response.status(401).json({ error: 'user not found' })
    }
  }
  else {

    //blog = await Blog.findById(request.params.id)

    //await blog.remove()

    //response.status(204).end()

    return response.status(401).json({ error: 'token not found' })
  }

})

module.exports = blogsRouter
