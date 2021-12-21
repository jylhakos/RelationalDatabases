const notesRouter = require('express').Router()

const jwt = require('jsonwebtoken')

const { Note, User } = require('../models')

//const Note = require('../models/note')

//const User = require('../models/user')

/*
notesRouter.get('/api/notes', async (request, response) => {

  console.log('notesRouter')

  const notes = await Note
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(notes.map(note => note.toJSON()))
})

notesRouter.get('/api/notes/:id', async (request, response) => {

  const note = await Note.findById(request.params.id)

  if (note) {

    response.json(note.toJSON())

  } else {

    response.status(404).end()
  }
})

notesRouter.post('/api/notes', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    date: new Date(),
    user: user._id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.json(savedNote.toJSON())
})

notesRouter.put('/api/notes/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote.toJSON())
    })
    .catch(error => next(error))
})
*/

const noteFinder = async (request, response, next) => {

  request.note = await Note.findByPk(request.params.id)

  next()
}

notesRouter.get('/api/notes', async (request, response) => {
  
  //const notes = await sequelize.query("SELECT * FROM notes", { type: QueryTypes.SELECT })
  
  const notes = await Note.findAll()

  //console.log(notes.map(note => note.toJSON()))

  console.log(JSON.stringify(notes))
  
  response.json(notes)
})

notesRouter.get('/api/notes/:id', async (request, response) => {
  
  const note = await Note.findByPk(request.params.id)
  
  if (note) {

    console.log(note.toJSON())

    response.json(note)

  } else {

    response.status(404).end()
  }
})

const getTokenFrom = request => {

  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

notesRouter.post('/api/notes', async (request, response) => {

  console.log(request.body)
  
  try {

    const note = await Note.create(request.body)

    //const note = Note.build(request.body)

    //note.important = false

    //await note.save()
    
    response.json(note)

  } catch(error) {

    return response.status(400).json({ error })
  }
})

notesRouter.put('/api/notes/:id', async (request, response) => {

  let note = await Note.findByPk(request.params.id)

  if (note) {

    note.important = request.body.important

    await note.save()

    response.json(note)

  } else {

    response.status(404).end()
  }
})

/*
notesRouter.delete('/api/notes/:id', async (request, response) => {
  
  await Note.findByIdAndRemove(request.params.id)
  
  response.status(204).end()
})
*/

notesRouter.delete('/api/notes/:id', noteFinder, async (request, response) => {
  
  if (request.note) {

    await request.note.destroy()
  }

  response.status(204).end()
})

module.exports = notesRouter