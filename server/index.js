require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const sequelize = require('./db');
const models = require('./models/models');
const PORT = process.env.PORT || 5000;
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const app = express();

app.use(cors()); 
app.use(express.json());
app.use('/api', router);


app.use(errorHandler);



const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('Подключение к базе данных успешно установлено.');
  } catch (error) {
    console.error('Ошибка подключения к базе данных:', error);
  }
};

start();

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});