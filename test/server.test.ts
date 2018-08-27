import { AppServer } from '../src/server';
const request = require('supertest');
import 'jest';

describe('GET /', () => {
  let app;
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
