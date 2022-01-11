# Insertion of notes

The creation of a note can only be successful if the request corresponding to the creation is accompanied by a valid token on login.

```
const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    res.status(401).json({ error: 'token missing' })
  }
  next()
}

router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const note = await Note.create({...req.body, userId: user.id, date: new Date()})
    res.json(note)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

```

Let's change the routes of all notes and all users.

```

router.get('/', async (req, res) => {
  const notes = await Note.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: user,
      attributes: ['name']
    }
  })
  res.json(notes)
})

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: note,
      attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)
})

```

