const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/database')

class Blog extends Model {}

Blog.init({
//const Blog = sequelize.define('blogs', {
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
  year: {
    type: DataTypes.INTEGER,
    defaultValue: new Date().getFullYear(),
    validate: {
      min: 1991,
      max: new Date().getFullYear()
    }
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  user_id: {
    field: 'user_id',
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  }
},
{
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'blog'
})

module.exports = Blog