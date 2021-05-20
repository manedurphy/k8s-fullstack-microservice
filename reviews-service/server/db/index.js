const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.PG_DB, process.env.PG_USER, process.env.PG_PASSWORD, {
    dialect: 'postgres',
    host: process.env.HOST,
    logging: false,
});

module.exports = sequelize;
