import 'jest';
import chai from 'chai';
import mockFs from 'mock-fs';

import { Configuration } from '../src/configuration/Configuration';

describe('Configuration Test', () => {
  describe('getConfiguration', () => {
    let mockConfig;
    let mockProdConfig;
    let mockTestConfig;
    beforeEach(() => {
      mockConfig = `{
                "database" :{
                    "server": "localhost",
                    "port": 1000,
                    "authentication": true,
                    "username": "testuser",
                    "password": "testpassword"
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
            "environment": "production"
        }`;

      mockTestConfig = `{
            "database" :{
                "server": "test",
                "port": 1000,
                "authentication": true,
                "username": "test",
                "password": "test"
            },
            "environment": "test",
            "extra-section": "value"
        }`;

      mockFs({
        'src/configuration': {
          'config.json': mockConfig,
          'config.prod.json': mockProdConfig,
          'config.test.json': mockTestConfig,
        },
      });
    });

    afterEach(() => {
      mockFs.restore();
      Configuration.reset();
    });

    it('should load base configuration if environment is not set', async () => {
      // Arrange: beforeEach

      // Act
      const config = await Configuration.getConfiguration();

      // Assert
      chai.assert.deepStrictEqual(JSON.parse(mockConfig), config);
    });

    it('should return singleton instance of configuration', async () => {
      // Arrange: beforeEach
      // console.debug(__dirname);
      // Act
      const config1 = await Configuration.getConfiguration();
      const config2 = await Configuration.getConfiguration();

      // Assert
      chai.assert.equal(config1, config2);
    });

    it('should return configuration for environment if environment is set', async () => {
      // Arrange: beforeEach

      // Act
      const config = await Configuration.getConfiguration('prod');

      // Assert
      chai.assert.deepStrictEqual(JSON.parse(mockProdConfig), config);
    });

    it('should not throw exception if section is missing in config.json', async () => {
      // Arrange: beforeEach
      mockFs.restore();

      mockFs({
        './src/configuration/': {
          'config.json': `{}`,
        },
      });

      // Act
      const config = await Configuration.getConfiguration();

      // Assert
      chai.assert.isDefined(config);
      chai.assert.isNotEmpty(config);
      chai.assert.doesNotThrow(Configuration.getConfiguration);
    });

    it('should not throw exception if extra section is present in config.json', async () => {
      // Arrange: beforeEach

      // Act
      const config = await Configuration.getConfiguration('test');

      // Assert
      chai.assert.isDefined(config);
      chai.assert.isNotEmpty(config);
      chai.assert.doesNotThrow(Configuration.getConfiguration);
    });

    it('should throw exception if config.env.json is missing', async () => {
      // Arrange: beforeEach

      try {
        // Act
        await Configuration.getConfiguration('unknown_env');
        chai.assert.fail('test case failed: [should throw exception if config.env.json is missing]');
      } catch (e) {
        // Assert
        chai.assert.isTrue((e + '').startsWith('Error: ENOENT, no such file or directory'));
      }
    });

    it('should throw exception if config.json is missing', async () => {
      // Arrange: beforeEach
      mockFs.restore();

      mockFs({
        './src/configuration/': {
          'confi.json': ``,
        },
      });

      try {
        // Act
        await Configuration.getConfiguration();
        chai.assert.fail('test case failed: [should throw exception if config.json is missing]');
      } catch (e) {
        // Assert
        chai.assert.isTrue((e + '').startsWith('Error: ENOENT, no such file or directory'));
      }
    });

    it('should throw exception if config.env.json is malformed', async () => {
      // Arrange: beforeEach
      mockFs.restore();

      mockFs({
        './src/configuration/': {
          'config.json': mockConfig,
          'config.test.json': `{"key"}`,
        },
      });

      try {
        // Act
        await Configuration.getConfiguration('test');
        chai.assert.fail('test case failed: [should throw exception if config.env.json is malformed]');
      } catch (e) {
        // Assert
        chai.assert.equal('SyntaxError: Unexpected token } in JSON at position 6', e + '');
      }
    });

    it('should throw exception if config.json is malformed', async () => {
      // Arrange: beforeEach
      mockFs.restore();

      mockFs({
        './src/configuration/': {
          'config.json': `{"key"}`,
          'config.test.json': `{"key"}`,
        },
      });

      try {
        // Act
        await Configuration.getConfiguration();
        chai.assert.fail('test case failed: [should throw exception if config.json is malformed]');
      } catch (e) {
        // Assert
        chai.assert.equal('SyntaxError: Unexpected token } in JSON at position 6', e + '');
      }
    });
  });
});
