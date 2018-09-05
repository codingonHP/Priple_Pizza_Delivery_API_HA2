import 'jest';
import chai from 'chai';

import { DataAccess } from '../src/db/DataAccess';
import { Fake } from './test-util/fake';

describe('DataAccess Test', () => {
    describe('addRecord', () => {
        it('should add record to database', async () => {
            // Arrange
            const fakeDb = Fake.getFakeDatabase();
            const fakeConfig = Fake.getFakeConfiguration();
            const db = new DataAccess(fakeConfig, fakeDb);

            // Act
            const result = await db.addRecord({ data: 'test data' });

            // Assert
            chai.assert.equal('test data added to user collection in pizza database', result);

        });

        it('should throw error if insert fails', async () => {
            // Arrange
            const fakeDb = Fake.getFakeDatabase();
            const fakeConfig = Fake.getFakeConfiguration();
            const db = new DataAccess(fakeConfig, fakeDb);

            try {
                // Act
                await db.addRecord(null);
                chai.assert.fail('throw exception', 'did not throw exception', 'test case failed: [should throw error if insert fails]');
            } catch (resp) {
                // Assert
                chai.assert.equal('failed to insert data', resp.err);
            }
        });

    });
});
