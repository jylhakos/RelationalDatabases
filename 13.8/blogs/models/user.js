const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/database')

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
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at'
  }
},
{
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'user'
})

module.exports = User