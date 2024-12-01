require('dotenv').config({ path: './dotenv.env' });
const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS || '', {
    host: process.env.DB_HOST,
    dialect: 'mysql',

});

module.exports = db;

//console.log(process.env.DB_NAME);