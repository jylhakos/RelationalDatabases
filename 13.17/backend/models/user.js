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
    allowNull: false,
    validate: {
      isEmail: { msg: 'Validation isEmail on username failed.' }
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    field: 'created_at'
  },
  updated_at: {
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