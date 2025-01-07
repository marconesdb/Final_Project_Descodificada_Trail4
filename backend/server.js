// backend/server.js

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());
app.use('/api', routes);

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`));
});