import 'jest';
import chai from 'chai';
import sinon, { SinonSandbox } from 'sinon';

import { Configuration } from '../src/configuration/Configuration';
import { File } from '../src/util/file';
import { FakePromise } from './test-util/fake';

describe('Configuration Test', () => {
  describe('getConfiguration', () => {
    let mockConfig;
    let mockProdConfig;
    let sandbox: SinonSandbox;
    beforeEach(() => {
      mockConfig = `{
                "database" :{
                    "server": "localhost",
                    "port": 1000,
                    "authentication": true,
                    "username": "testuser",
                    "password": "testpassword"
                },
                "server": {
                  "host": "localhost",
                  "port": "1001"
                },
                "environment": "test"
            }`;

      mockProdConfig = `{
            "database" :{
                "server": "prodhost",
                "port": 1000,
                "authentication": true,
                "username": "testuser",
                "password": "testpassword"
            },
            "server": {
              "host": "localhost",
              "port": "1001"
            },
            "environment": "production"
        }`;

        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      Configuration.reset();
      sandbox.restore();
    });

    it('should load base configuration if environment is not set', async () => {
      // Arrange: beforeEach
      sandbox.stub(File, 'readFileAsyc').returns(FakePromise.resolve(mockConfig));

      // Act
      const config = await Configuration.getConfiguration();

      // Assert
      chai.assert.deepStrictEqual(JSON.parse(mockConfig), config);
    });

    it('should return singleton instance of configuration', async () => {
      // Arrange: beforeEach
      sandbox.stub(File, 'readFileAsyc').returns(FakePromise.resolve(mockConfig));

      // Act
      const config1 = await Configuration.getConfiguration();
      const config2 = await Configuration.getConfiguration();

      // Assert
      chai.assert.equal(config1, config2);
    });

    it('should return configuration for environment if environment is set', async () => {
      // Arrange: beforeEach
      sandbox.stub(File, 'readFileAsyc').returns(FakePromise.resolve(mockProdConfig));

      // Act
      const config = await Configuration.getConfiguration('prod');

      // Assert
      chai.assert.deepStrictEqual(JSON.parse(mockProdConfig), config);
    });

    it('should not throw exception if section is missing in config.json', async () => {
      // Arrange: beforeEach
      sandbox.stub(File, 'readFileAsyc').returns(FakePromise.resolve(`{}`));

      // Act
      const config = await Configuration.getConfiguration();

      // Assert
      chai.assert.isDefined(config);
      chai.assert.isNotEmpty(config);
      chai.assert.doesNotThrow(Configuration.getConfiguration);
    });

    it('should not throw exception if extra section is present in config.json', async () => {
      // Arrange: beforeEach
      sandbox.stub(File, 'readFileAsyc').returns(FakePromise.resolve(`{"extra-section": "value"}`));

      // Act
      const config = await Configuration.getConfiguration('test');

      // Assert
      chai.assert.isDefined(config);
      chai.assert.isNotEmpty(config);
      chai.assert.doesNotThrow(Configuration.getConfiguration);
    });

    it('should throw exception if config.env.json is missing', async (done) => {
      // Arrange: beforeEach
      sandbox.stub(File, 'readFileAsyc').returns(FakePromise.reject(new Error(`Error: ENOENT, no such file or directory`)));

      chai.assert.throws(() => {
        // Act
        Configuration.getConfiguration('unknown_env').catch((e) => {
          chai.assert.instanceOf(e, Error);
          chai.assert.equal(e.message, 'Error: ENOENT, no such file or directory');
          done();
        });
      });
    });

    it('should throw exception if config.env.json is malformed', async (done) => {
      // Arrange: beforeEach
      const fakeFsStub = sandbox.stub(File, 'readFileAsyc');
      fakeFsStub.withArgs('./src/configuration/config.json').returns(mockConfig);
      fakeFsStub.withArgs('./src/configuration/config.test.json').returns(FakePromise.resolve(`{"key"}`));

      chai.assert.throws(() => {
        // Act
        Configuration.getConfiguration('test').catch((e) => {
          chai.assert.instanceOf(e, SyntaxError);
          chai.assert.isTrue(e.toString().startsWith('SyntaxError: Unexpected token } in JSON'));
          done();
        });
      });
    });

    it('should throw exception if config.json is malformed', async (done) => {
      // Arrange: beforeEach
      sandbox.stub(File, 'readFileAsyc').returns(FakePromise.resolve(`{"key"}`));

      chai.assert.throws(() => {
         // Act
          Configuration.getConfiguration().catch((e) => {
           chai.assert.instanceOf(e, SyntaxError);
           chai.assert.isTrue(e.toString().startsWith('SyntaxError: Unexpected token } in JSON'));
           done();
          });
      });

    });
  });
});
