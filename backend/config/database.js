
// backend/config/database.js

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  logging: false
});

sequelize
  .authenticate()
  .then(() => console.log('Conexão bem-sucedida com o banco de dados.'))
  .catch((err) => console.error('Erro ao conectar ao banco de dados:', err));

module.exports = sequelize;

