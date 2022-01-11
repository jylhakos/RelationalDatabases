# Node application using a relational database

**Sequelize**

Sequelize is a promise-based Node.js Object Relational Mapper (ORM) tool for Postgres database.

Object Relational Mapping is a way of converting data between relational databases and objects.

Most of the methods provided by Sequelize are asynchronous and therefore return Promises.

```
$ npm install --save sequelize
```

A link to Sequelize

https://sequelize.org/

**Model**

When using Sequelize, each table in the database is represented by a model.

The model tells Sequelize several things about the entity it represents, such as the name of the table in the database and which columns it has and their data types.

To connect to the database, you must create a Sequelize instance.

```
require('dotenv').config()

const { Sequelize, Model, DataTypes } = require('sequelize')

const express = require('express')

const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

class Note extends Model {}

Note.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  important: {
    type: DataTypes.BOOLEAN
  },
  date: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'note'
})

app.get('/api/notes', async (req, res) => {
  const notes = await Note.findAll()
  res.json(notes)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

```
