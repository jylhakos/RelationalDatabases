const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

const loginRouter = require('express').Router()

const User = require('../models/user')

const { SECRET } = require('../utils/config')

loginRouter.post('/login', async (request, response) => {

  const body = request.body

  console.log('loginRouter', body.username, body.password)

  try {

  const user = await User.findOne({ where: {
      username: body.username
    }
  })

  const passwordCorrect = body.password === 'fullstack'

  //const passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {

    return response.status(401).json({
      error: 'Error: username or password'
    })

  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })

  } catch (error) {

    console.error('Unable to connect the database.', error)

    return response.status(401).json({Error: 'Error login'})
  }
})

module.exports = loginRouter