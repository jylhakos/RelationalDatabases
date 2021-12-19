const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/api/users', async (request, response) => {

  const body = request.body

  const saltRounds = 10

  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  console.log('users', body.username, body.password)

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/api/users', async (request, response) => {
  const users = await User
    .find({}).populate('notes', { content: 1, date: 1 })
    
  response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter