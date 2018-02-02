const app = require('../src/app');
const mongoose = require('mongoose');
const request = require('supertest');

describe('My Auth applicaton tests', () => {

  afterAll(async () => mongoose.disconnect());

  test('Test home page', async () => {
    const response = await request(app).get('/home');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('This my-auth service');
  });

});
