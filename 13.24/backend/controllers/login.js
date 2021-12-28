const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

const loginRouter = require('express').Router()

const User = require('../models/user')

const Session = require('../models/session')

const { SECRET } = require('../utils/config')

loginRouter.post('/', async (request, response) => {

  const username = request.body.username

  const password = request.body.password

  console.log('loginRouter', username, password)

  try {

    const user = await User.findOne({ where: {
        username: username
      }
    })

    const passwordCorrect = password === 'fullstack'

    //const passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'Error: username or password'
      })
    }

    if (user.disabled === true) {
      return response.status(401).json({
        error: 'Error: user disabled'
      })
    }

    console.log('user.dataValues.id', user.dataValues.id)

    var session = await Session.findOne({ where: {
        user_id: user.dataValues.id
      }
    })

    if (!session) {
      session = new Session({
        user_id: user.id,
        state: true
      })
    }
    else {
      session.state = true
    }

    await session.save()
    
    const userForToken = {
      username: user.username,
      id: user._id,
    }

    const token = jwt.sign(userForToken, SECRET)

    console.log('token', token)

    response.status(200).send({ token, username: user.username, name: user.name })

  } catch (error) {

    console.error('Unable to connect the database.', error)

    return response.status(401).json({Error: 'Error login'})
  }
})

module.exports = loginRouter