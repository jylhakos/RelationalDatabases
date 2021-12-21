// $ npm install --save sequelize

// $ npm install --save sequelize-cli

// $ npm install --save pg

// $ npm install --save dotenv

// $ npm install --save curl

// $ heroku config

// DATABASE_URL=postgres://<USER_NAME>@<HOST_NAME>:5432/<DATA_BASE>

require('dotenv').config()

const { Sequelize, Model, DataTypes } = require('sequelize')

console.log('process.env.DB_HOST', process.env.DB_HOST, 'process.env.DB_PORT', process.env.DB_PORT)

const sequelize = new Sequelize(process.env.DB_SCHEMA || 'postgres',
                                process.env.DB_USER || 'postgres',
                                //process.env.DB_PASSWORD || 'postgres',
                                process.env.POSTGRES_PASSWORD || 'postgres',
                                {
                                    host: process.env.DB_HOST || 'localhost',
                                    port: process.env.DB_PORT || 5432,
                                    dialect: 'postgres',
                                    dialectOptions: {
                                        ssl: process.env.DB_SSL == "true"
                                }
})

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

module.exports = mongoose.model('Blog', blogSchema)