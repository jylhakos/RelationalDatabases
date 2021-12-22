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
