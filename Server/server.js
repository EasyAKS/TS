// Подключение необходимых зависимостей
const express = require('express');
const { Pool } = require('pg');

// Создание экземпляра приложения Express
const app = express();
const PORT = process.env.PORT || 3000;

// Добавляем middleware для обработки CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Параметры подключения к базе данных PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'aks',
  password: 'admin',
  port: 5432,
});

// Маршрут для обработки запросов на получение данных из базы данных
app.get('/data', async (req, res) => {
  try {
    // Выполнение запроса к базе данных PostgreSQL для получения данных о темах и вопросах
    const themesQuery = await pool.query('SELECT * FROM themes');
    const questionsQuery = await pool.query('SELECT * FROM questions');

    // Преобразование данных в формат JSON
    const themes = themesQuery.rows.map(theme => ({
      themeName: theme.theme_name,
      questions: questionsQuery.rows
        .filter(question => question.theme_id === theme.theme_id)
        .map(question => ({
          questionNumber: `Question ${question.question_number}`,
          questionFullDescription: question.question_full_description,
          answers: {
            wrong1: question.wrong_answer_1,
            wrong2: question.wrong_answer_2,
            wrong3: question.wrong_answer_3,
            correct: question.correct_answer,
          },
          picture: question.picture_url ? question.picture_url : null,
        })),
    }));

    // Формирование и отправка JSON-ответа
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ themes }, null, 2)); // Отправляем отформатированный JSON
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Internal Server Error');
  }
});

// Запуск сервера на указанном порту
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
