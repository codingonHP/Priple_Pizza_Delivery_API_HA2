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

        it('should throw error if insert fails', async (done) => {
            // Arrange
            const fakeDb = Fake.getFakeDatabase();
            const fakeConfig = Fake.getFakeConfiguration();
            const db = new DataAccess(fakeConfig, fakeDb);

            chai.assert.throws(() => {
                // Act
                db.addRecord(null).catch((e) => {
                    chai.assert.equal(e.err, 'failed to insert data');
                    done();
                });
            });
        });

    });
});
