import 'jest';
import { expect } from 'chai';

declare const describe: jest.Describe;
declare const test: jest.It;

describe('Project Setup Test', () => {
  test('should expect Hello World', () => {
    expect('Hello World').to.equal('Hello World');
  });

  test('chai library setup', () => {
      expect('Chai Works').to.be.a('string');
      expect('Chai Works').to.be.equals('Chai Works');
  });
});
