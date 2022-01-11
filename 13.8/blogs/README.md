# User management

If the user is found and the password is correct (i.e. secret for all the users), jsonwebtoken is returned containing the user's information.

```
$ npm install jsonwebtoken
```

The file index.js expands

```
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(express.json())

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

```

We define that there is a one to many relationship connection between the users and notes lines.

When using Sequelize, the reference key can be defined by modifying the models/index.js file as follows.

```
const Note = require('./note')

const User = require('./user')

User.hasMany(Note)

Note.belongsTo(User)

Note.sync({ alter: true })

User.sync({ alter: true })

module.exports = {
  Note, User
}
```

The user-defining model in the file models/user.js

```
const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'user'
})

module.exports = User
```

The file models/index.js expands the model.

```
const Note = require('./note')

const User = require('./user')

User.sync()

module.exports = {
  Note, User
}
```

The route handlers that take care of creating a new user in the controllers/users.js file.

```
const router = require('express').Router()

const { User } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router
```

The router handler for the login (file controllers/login.js) 

```
const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

const passwordCorrect = body.password === 'secret'
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router

```



