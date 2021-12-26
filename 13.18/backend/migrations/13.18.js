// $ sudo -u postgres psql postgres

const { DataTypes } = require('sequelize')

module.exports = {

  up: async (queryInterface) => {

    var year = new Date().getFullYear()

    console.log('year', year)

    await queryInterface.createTable('blogs', {
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
        defaultValue: year,
        validate: {
          min: 1991,
          max: year
        }
      },
  		likes: {
    		type: DataTypes.INTEGER,
    		defaultValue: 0
  		},
  		created_at: {
    		type: DataTypes.DATE,
    		field: 'created_at'
  		},
  		updated_at: {
    		type: DataTypes.DATE,
    		field: 'updated_at'
  		}
    })

    await queryInterface.createTable('users', {
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
    })

    await queryInterface.addColumn('blogs', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('blogs')
    await queryInterface.dropTable('users')
  },
}