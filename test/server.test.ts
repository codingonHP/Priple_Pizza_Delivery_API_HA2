import supertest from 'supertest';
import 'jest';

import { AppServer } from '../src/server';

describe('GET /', () => {
  let app;
  const request = supertest;
  beforeEach(() => {
    app = new AppServer().getServer();
  });
  it('should respond with hello world', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/plain')
      .expect(200, 'hello world', done);
  });
});
