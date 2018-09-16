import supertest from 'supertest';
import 'jest';

import { AppServer } from '../src/core/server/server';
import { Application } from '../src/app';
import { Configuration } from '../src/configuration/Configuration';

describe('GET /', () => {
  let app;
  let application;
  const request = supertest;
  beforeEach(async () => {
    application = new Application();
    const config = await Configuration.getConfiguration();
    app = new AppServer(config).getServer();
  });

  it('should respond with hello world', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/plain')
      .expect(200, 'hello world', done);
  });
});
