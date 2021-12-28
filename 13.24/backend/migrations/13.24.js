// $ sudo -u postgres psql postgres

const { DataTypes } = require('sequelize')

module.exports = {

  up: async (queryInterface) => {

    await queryInterface.addColumn('users', 'disabled', {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    })

    /*
    await queryInterface.createTable('sessions', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
    })
    */
  },

  down: async (queryInterface) => {

    await queryInterface.removeColumn('users', 'disabled')

    //await queryInterface.dropTable('sessions')
  },
}