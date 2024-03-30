// Подключение необходимых зависимостей
const express = require('express');
const { Pool } = require('pg');

// Создание экземпляра приложения Express
const app = express();
const PORT = process.env.PORT || 3000;

// Добавляем middleware для обработки CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Можете указать конкретный адрес вашего клиентского приложения вместо '*'
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Параметры подключения к базе данных PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'driving_school',
    password: 'admin',
    port: 5432,
});

// Подключение к базе данных PostgreSQL
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL database');
  release();
});

// Маршрут для обработки запросов на получение данных из базы данных
app.get('/data', async (req, res) => {
  try {
    // Выполнение запроса к базе данных PostgreSQL
    const result = await pool.query('SELECT plate_num FROM public.car');
    res.json(result.rows); // Отправка данных в формате JSON обратно клиенту
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Internal Server Error'); // Отправка статуса ошибки 500 в случае проблемы с запросом
  }
});

// Запуск сервера на указанном порту
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



