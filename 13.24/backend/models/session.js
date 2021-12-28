const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/database')

class Session extends Model {}

Session.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  },
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
},
{
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'session'
})

module.exports = Session