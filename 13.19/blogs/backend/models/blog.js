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
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  createdAt: 'created_at',
  created_at: {
    type: DataTypes.DATE,
    field: 'created_at'
  },
  updatedAt: 'updated_at',
  updated_at: {
    type: DataTypes.DATE,
    field: 'updated_at'
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