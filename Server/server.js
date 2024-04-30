const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'aks',
  password: 'admin',
  port: 5432,
});

// Обработка ошибок при подключении к базе данных
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

app.get('/data', async (req, res) => {
  try {
    const themesQuery = await pool.query('SELECT * FROM themes');
    const questionsQuery = await pool.query('SELECT * FROM questions');

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

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ themes }, null, 2));
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = app;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
