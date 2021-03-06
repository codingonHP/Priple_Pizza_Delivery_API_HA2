import 'jest';
import chai from 'chai';
import mockFs from 'mock-fs';
import { File } from '../src/util/file';

describe('File Test', () => {
    describe('readFileAsync', () => {
        let mockConfig;
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
        });

        it('should read file from fs', async() => {
            mockFs({
                'src/configuration': {
                  'config.json': mockConfig,
                },
            });
            const file = await File.readFileAsyc('src/configuration/config.json');
            chai.assert.equal(mockConfig, file);
            mockFs.restore();
        });

        it('should throw error if file read fails', async() => {
            try {
                await File.readFileAsyc('src/configuration/not-found-file.txt');
            } catch (e) {
                chai.assert.isDefined(e);
            }
        });
    });
});
