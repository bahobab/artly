import request from 'supertest';

import { app } from '../../app';

it('clears the cookie set from a successful login', async () => {
  const user = { email: 'test@test.concurrent', password: 'password' };

  await request(app)
    .post('/api/users/login')
    .send(user)
    .expect(201);
  
  const resp = await request(app)
    .post('/api/users/logout')
    .send({})
    .expect(200);
  
  // expect(resp.get('Set-Cookie')[0]).toEqual('??') // to find out
})