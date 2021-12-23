const bcrypt = require('bcrypt')

const usersRouter = require('express').Router()

const { User } = require('../models')

//const User = require('../models/user')

usersRouter.get('/users', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, url: 1, likes: 1, author: 1 })

  response.json(users.map(user => user.toJSON()))
})

usersRouter.get('/users/:id', async (request, response) => {

  try {

    const user = await User.findByPk(request.params.id)
    
    if (user) {

      response.json(user)

    } else {

      response.status(404).end()
    }

  } catch (error) {

    console.error(error);
  }
})

usersRouter.post('/users', async (request, response) => {

  const { password, name, username } = request.body

  console.log('users', username, password)

  if ( !password || password.length<3 ) {
    return response.status(400).send({
      error: 'Error: password must min length 3'
    })
  }

  const saltRounds = 10

  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username, 
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.put('/users/:username', async (request, response) => {

  console.log('request.params.username', request.params.username)

  try {

    const user = await User.findOne({ where: { username: request.params.username }})
    
    if (user) {

      user.username = request.body.username

      await user.save()

      response.json(user)

    } else {

      response.status(404).end()
    }

  } catch (error) {

    console.error(error);
  }
})

module.exports = usersRouter