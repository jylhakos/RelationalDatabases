const logoutRouter = require('express').Router()

const User = require('../models/user')

const Session = require('../models/session')

logoutRouter.delete('/', async (request, response) => {

  //console.log('logoutRouter', request)

  const token = request.body.token

  const username = request.body.username
  
  const name = request.body.name

  console.log('logoutRouter', token, username, name)

  try {

    const user = await User.findOne({ where: {
        username: username
      }
    })

    console.log('user', user)

    if (!(user)) {
      return response.status(401).json({
        error: 'Error: username'
      })
    }

    const session = await Session.findOne({ where: {
        user_id: user.id
      }
    })

    session.state = false

    await session.save()

    return response.status(200)

  } catch (error) {

    console.error('Unable to logout.', error)

    return response.status(401).json({Error: 'Error logout'})
  }

})

module.exports = logoutRouter