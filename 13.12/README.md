# query-parameter

Retrieve only important or non-important notes

The column important can be true or false, using one of the many Sequelize operations Op.in 

```
router.get('/', async (req, res) => {
  
  const where = {}

  if (req.query.important) {
    where.important = req.query.important === "true"
  }

  if (req.query.search) {
    where.content = {
      [Op.substring]: req.query.search
    }
  }

  const notes = await Note.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: user,
      attributes: ['name']
    },
    where
  })

  res.json(notes)
})

```

