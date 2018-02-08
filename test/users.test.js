const app = require('../src/app');
const mongoose = require('mongoose');
const request = require('supertest');

describe('User and Auth API tests', () => {

  beforeAll(() => {
    app.setup();
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    return mongoose.disconnect();
  });

  const user = {
    username: 'chris.li',
    password: '12345678',
    org: 'test'
  };

  test('Create User API', async () => {
    const response = await request(app).post('/users').send(user);
    expect(response.status).toBe(201);
    expect(response.body['_id']).toBeDefined();
    expect(response.body.roles).toEqual(['USER']);
  });

  test('No duplicate username/org', async () => {
    const response = await request(app).post('/users').send(user);
    expect(response.status).toBe(409);
  });

  test('Auth API', async () => {
    const response = await request(app).post('/auth').send(user);
    expect(response.status).toBe(201);
    expect(response.body.accessToken).toBeDefined();
  });

});
