const blogsRouter = require('express').Router()

const jwt = require('jsonwebtoken')

//const Blog = require('../models/blog')

//const User = require('../models/user')

const { Blog, User } = require('../models')

const blogFinder = async (request, response, next) => {

  request.blog = await Blog.findByPk(request.params.id)

  next()
}

blogsRouter.get('/blogs', async (request, response) => {
  
  console.log('blogsRouter')

  //const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
  
  const blogs = await Blog.findAll()

  //console.log(blogs.map(blog => blog.toJSON()))

  console.log(JSON.stringify(blogs))
  
  response.json(blogs)

})

blogsRouter.get('/blogs/:id', async (request, response) => {

  const blog = await Blog.findByPk(request.params.id)

  if (blog) {

    console.log(blog.toJSON())

    response.json(blog)

  } else {

    response.status(404).end()
  }
})

blogsRouter.put('/blogs/:id', async (request, response) => {

  //const blog = request.body

  //const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  
  //response.json(updatedBlog.toJSON())

  let blog = await Blog.findByPk(request.params.id)

  if (blog) {

    blog.likes = request.body.likes

    await blog.save()

    response.json(blog)

  } else {

    response.status(404).end()
  }

})

blogsRouter.post('/blogs', async (request, response) => {

  console.log(request.body)
  
  try {

    const blog = await Blog.create(request.body)

    //const blog = Blog.build(request.body)

    //blog.author = 'unknown'

    //await blog.save()
    
    response.json(blog)

  } catch(error) {

    return response.status(400).json({ error })
  }
})

blogsRouter.delete('/blogs/:id', async (request, response) => {

  var decodedToken = null

  var user = null

  var blog = null

  if(request.token && process.env.SECRET) {

    decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
    
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    user = await User.findById(decodedToken.id)
  
    blog = await Blog.findById(request.params.id)
  
    if (blog.user.toString() !== user.id.toString()) {

    return response.status(401).json({ error: 'only the creator can delete blogs' })
  
    }

    await blog.remove()
  
    user.blogs = user.blogs.filter(b => b.id.toString() !== request.params.id.toString())
  
    await user.save()
  
    response.status(204).end()
  }
  else {

    blog = await Blog.findById(request.params.id)

    await blog.remove()

    response.status(204).end()
  }
})

module.exports = blogsRouter

/*
blogsRouter.get('/blogs', async (request, response) => {

  console.log('blogsRouter')

  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/blogs', async (request, response) => {

  const blog = new Blog(request.body)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!blog.url || !blog.title) {
    return response.status(400).send({ error: 'title or url missing ' })
  }

  if (!blog.likes) {
    blog.likes = 0
  }

  blog.user = user
  
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/blogs/:id', blogFinder, async (request, response) => {

  if (request.blog) {

    await request.blog.destroy()
  }

  response.status(204).end()
})
*/
