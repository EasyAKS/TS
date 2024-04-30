const request = require('supertest');
const app = require('./server'); // Подключение вашего приложения Express

let server;

beforeAll(async () => {
  server = app.listen(3001);
  console.log('Test server running on port 3001');
});

afterAll(async () => {
  if (server) {
    await new Promise(resolve => server.close(resolve));
    console.log('Test server closed');
  }
});

describe('GET /data', () => {
  it('responds with JSON containing themes and questions data', async () => {
    const response = await request(app)
      .get('/data')
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.themes).toBeDefined();
  });

  it('checks response structure', async () => {
    const response = await request(app).get('/data').set('Accept', 'application/json');

    expect(Array.isArray(response.body.themes)).toBe(true);
    if (response.body.themes.length > 0) {
      const randomTheme = response.body.themes[Math.floor(Math.random() * response.body.themes.length)];
      expect(randomTheme.themeName).toBeDefined();
      expect(Array.isArray(randomTheme.questions)).toBe(true);
      if (randomTheme.questions.length > 0) {
        const randomQuestion = randomTheme.questions[Math.floor(Math.random() * randomTheme.questions.length)];
        expect(randomQuestion.questionNumber).toBeDefined();
        expect(randomQuestion.questionFullDescription).toBeDefined();
        expect(randomQuestion.answers).toBeDefined();
      }
    }
  });

  it('checks for non-empty data', async () => {
    const response = await request(app).get('/data').set('Accept', 'application/json');

    expect(response.body.themes.length).toBeGreaterThan(0);
    const hasNonEmptyQuestions = response.body.themes.some(theme => theme.questions.length > 0);
    expect(hasNonEmptyQuestions).toBe(true);
  });

  it('returns error for invalid route', async () => {
    const response = await request(app).get('/invalid-route').set('Accept', 'application/json');
    expect(response.status).toBe(404);
  });

  it('checks response headers', async () => {
    const response = await request(app).get('/data').set('Accept', 'application/json');

    expect(response.headers['content-type']).toContain('application/json');
  });
});
