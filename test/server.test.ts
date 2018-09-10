import supertest from 'supertest';
import 'jest';

import { AppServer } from '../src/core/server/server';
import { Application } from '../src/app';

describe('GET /', () => {
  let app;
  let application;
  const request = supertest;
  beforeEach(() => {
    application = new Application();
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
