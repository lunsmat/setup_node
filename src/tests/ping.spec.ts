import request from 'supertest';
import app from '../app';

test('It shoult be okay', async () => {
    const response = await request(app).get('/ping');

    expect(response.body).toMatchObject({ pong: true });
});
