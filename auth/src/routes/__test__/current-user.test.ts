import request from 'supertest';

import { app } from '../../app';

it('returns details about the current signed/up user', async () => {
  const cookie = await global.signin();
  
  const res = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);
  
  expect(res.body.currentUser).toEqual('test@tes.com');
});

it('responds with null for a non authenticated user', async () => {
  const resp = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);
  
  expect(resp.body.currentUser).toEqual(null);
})