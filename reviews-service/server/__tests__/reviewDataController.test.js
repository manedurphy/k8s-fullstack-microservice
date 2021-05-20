require('../db/relationships');
const db = require('../db/index');
const request = require('supertest');
const app = require('../server');

let server = app.listen(5003, () => console.log('Test server started'));

beforeAll(async () => {
    await db.sync();
});

afterAll(async () => {
    server.close();
    await db.close();
});

describe('GET /api/reviews/info/:space', () => {
    test('should get review data with properties avg and reviewCount', async () => {
        const res = await request(app).get('/api/reviews/info/1');

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('avg');
        expect(res.body).toHaveProperty('reviewCount');
    });
});
