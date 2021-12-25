const bcrypt = require('bcrypt')

const usersRouter = require('express').Router()

const { User, Blog } = require('../models')

//const User = require('../models/user')

const { check, validationResult } = require('express-validator')

usersRouter.get('/', async (request, response) => {

  console.log('usersRouter.get /users')

  const users = await User.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: Blog,
      attributes: ['id', 'title', 'url', 'likes', 'author' ]
    }
  })

  response.json(users.map(user => user.toJSON()))
})

usersRouter.get('/:id', async (request, response) => {

  console.log('usersRouter.get /users/:id', request.params.id)

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

usersRouter.post('/', [check('username').isEmail()], async (request, response) => {

  const { username, name, password } = request.body

  console.log('usersRouter.post /users', username, name, password)

  const errors = validationResult(request)

  if (!errors.isEmpty()) {

    console.log(JSON.stringify({errors: errors.array()}))

    return response.status(400).json({errors: errors.array()})
  }

  if ( !password || password.length < 3 ) {

    return response.status(400).send({
      error: 'Error: password must min length 3'
    })
  }

  try {

    const saltRounds = 10

    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username, 
      name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)

  } catch (error) {

    console.error(error)

    return response.status(400).send({
      error: 'Validation isEmail on username failed.'
    })
  }

})

usersRouter.put('/:username', async (request, response) => {

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