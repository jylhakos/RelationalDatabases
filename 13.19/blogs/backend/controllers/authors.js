const authorsRouter = require('express').Router()

const { sequelize } = require('../utils/database')

const { Blog } = require('../models')

authorsRouter.get('/', async (request, response) => {
  
  console.log('authorsRouter.get')

  const authors = await Blog.findAll({
    attributes: ['author',
      [sequelize.fn('count', sequelize.col('title')), 'articles'],
      [sequelize.fn('sum', sequelize.col('likes')), 'likes']
    ],
    group: ['author'],
    raw: true
  })

  console.log(JSON.stringify(authors))

  response.json(authors)
})

module.exports = authorsRouter
