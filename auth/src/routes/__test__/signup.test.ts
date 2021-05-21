import request from 'supertest';

import { app } from '../../app';

it('returns 201 on successful signup with valid email and password', async () => {
  request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    // .expect(201);
  
});

it('returns 400 if no password or email supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: '' })
    .expect(400);
  
  await request(app)
    .post('/api/users/signup')
    .send({ email: '', password: 'dkdkff' })
    .expect(400);
});

it('returns 400 if email or password invalid', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 't' })
    .expect(400);
  
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'w12345678901234567890p' })
    .expect(400);
  
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'pfpf', password: 'eeufccds' })
    .expect(400);
});

it.skip('prohibits signup with duplicated email', async () => {
  // const email = 'test@test.com'
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'tkkjhhgf' })
    .expect(201);
  
  request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password1' })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  const res = request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.co', password: 'ereedfk' })
    .expect(201);
  
  expect(res.get('Set-Cookie')).toBeDefined();

});
