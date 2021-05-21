import request from 'supertest';

import { app } from '../../app';

it.skip('return 200 with successful login with valid credentials', async () => {
  // 1. signup
  const user = { email: 'test@test.concurrent', password: 'password' };
  await request(app)
    .post('/api/users/signup')
    .send(user)
    .expect(201);
  
  // 2. signin
  request(app)
    .post('/api/users/signin')
    .send(user)
    .expect(200)
});

it('returns 400 if login with email that has not signed up', async () => {
  request(app)
    .post('/api/users/signin')
    .send({ email: 'fdkjfd@test.co', password: 'fkjfkdf' })
    .expect(400);
});

it.skip('returns a cookie if successfully signed with valid credentials', async () => {
  const user = { email: 'test@test.concurrent', password: 'password' };

  await request(app)
    .post('/api/users/signup')
    .send(user)
    .expect(201);
  
  // 2. signin
  const resp = await request(app)
    .post('/api/users/signin')
    .send(user)
    .expect(200);
  
  expect(resp.get('Set-Cookie')).toBeDefined();
})