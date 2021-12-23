const blogsRouter = require('express').Router()

const jwt = require('jsonwebtoken')

const { SECRET } = require('../utils/config')

const { Blog, User } = require('../models')

const tokenExtractor = (request, response, next) => {

  console.log('tokenExtractor', SECRET)

  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    
    console.log('authorization', authorization)

    try {

      request.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    
      console.log('request.decodedToken', request.decodedToken)

    } catch{

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

blogsRouter.get('/blogs', async (request, response) => {
  
  console.log('blogsRouter.get /blogs')

  const blogs = await Blog.findAll({
    include: {
      model: User,
      attributes: { exclude: ['userId'] }
    }
  })

  //console.log(blogs.map(blog => blog.toJSON()))

  console.log(JSON.stringify(blogs))
  
  response.json(blogs)
})

blogsRouter.get('/blogs/:id', async (request, response) => {

  try {

    const blog = await Blog.findByPk(request.params.id)

    if (blog) {

      console.log(blog.toJSON())

      response.json(blog)

    } else {

      response.status(404).end()
    }

  } catch(error) {

    return response.status(404).json({ error })
  }
})

blogsRouter.put('/blogs/:id', async (request, response) => {

  console.log('request.params.id', request.params.id)

  try {

    var blog = await Blog.findByPk(request.params.id)

    if (blog) {

      console.log('request.body.likes', request.body.likes)

      blog.likes = request.body.likes

      await blog.save()

      response.json(blog)

    } else {

      response.status(404).end()
    }

  } catch(error) {

    return response.status(404).json({ error })
  }
})

blogsRouter.post('/blogs', tokenExtractor, async (request, response) => {

  console.log('request.body', request.body, 'request.decodedToken', request.decodedToken)
  
  try {

    const user = await User.findOne({ where: { username: request.decodedToken.username }})
    
    if (user) {

      console.log('user', user)

      blog = await Blog.create({ ...request.body, userId: user.id })

      console.log('blog', blog)

      //const blog = Blog.build(request.body)

      //blog.author = 'unknown'

      //await blog.save()
      
      response.json(blog)

    }

  } catch(error) {

    console.log(error)

    return response.status(400).json({ error })
  }
})

blogsRouter.delete('/blogs/:id', tokenExtractor, async (request, response) => {

  console.log('delete', request.params.id)

  if(request.token && SECRET) {

    console.log('delete', request.token, request.decodedToken)

    var decodedToken = jwt.verify(request.token, SECRET)

    if (!request.token || !decodedToken.id) {

      console.error('token missing or invalid')
    
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    //user = await User.findById(decodedToken.id)

    const user = await User.findOne({ where: { username: request.decodedToken.username }})
    
    if (user) {

      const blog = await Blog.findById(request.params.id)

      if (blog.user.toString() !== user.id.toString()) {

        console.error('only the creator can delete blogs')

        return response.status(401).json({ error: 'only the creator can delete blogs' })
      }

      await blog.remove()
    
      user.blogs = user.blogs.filter(b => b.id.toString() !== request.params.id.toString())
    
      await user.save()
    
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
