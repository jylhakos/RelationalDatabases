const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/database')

const Blog = sequelize.define('blogs', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  author: {
      type: DataTypes.STRING(),
      allowNull: true
  },
  url: {
      type: DataTypes.STRING(),
      allowNull: false
  },
  title: {
      type: DataTypes.STRING(),
      allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
})

module.exports = Blog

/*
const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
*/
