import 'jest';
import sinon from 'sinon';
import { assert } from 'chai';
import { MongoClient, Db } from 'mongodb';

import { MongoDb } from '../src/mongoDb/mongoDb';
import { Configuration } from '../src/configuration/Configuration';

describe('MongoDb Test', () => {
    describe('connect', () => {
        let db: MongoDb;
        beforeEach(async () => {
            // arrange
            const fakeConfig = sinon.fake.returns({ database: {
                server: 'fakehost',
                port: '1001',
            }});
            sinon.replace(Configuration, 'getConfiguration', fakeConfig);
            db = new MongoDb(await Configuration.getConfiguration());
        });

        afterEach(() => {
            sinon.restore();
        });

        it('should return promise<MongoClient> on successful connection', () => {
            // arrange: beforeEach
            const fakeConnection = sinon.fake.resolves({});
            sinon.replace(MongoClient, 'connect', fakeConnection);

            // act
            const result = db.connect();

            // assert
            sinon.assert.called(fakeConnection);

            // assert
            assert.isDefined(result);
        });

        it('should call mongoClient connect with config.dbServer.server value', async () => {
            // arrange: beforeEach
            const fakeConnection = sinon.fake.resolves({});
            sinon.replace(MongoClient, 'connect', fakeConnection);

            // act
            await db.connect();

            // assert
            sinon.assert.calledWithExactly(fakeConnection, 'mongodb://fakehost:1001/fakehost', { useNewUrlParser: true });
        });

        it('should throw exception if MongoClient.connect fails', async () => {
            // arrange : before each
            const fakeConnection = sinon.fake.rejects('failed to connect to mongo server');
            sinon.replace(MongoClient, 'connect', fakeConnection);

            // act
            try {
                await db.connect();
            } catch (e) {
                // assert
                assert.equal(e, 'Error: failed to connect to mongo server');
                sinon.assert.callCount(fakeConnection, 1);
            }
        });
    });

    describe('close', () => {

        let db: MongoDb;
        beforeEach(async () => {
            // arrange
            const fakeConfig = sinon.fake.returns({ database: {
                server: 'fakehost',
            }});
            sinon.replace(Configuration, 'getConfiguration', fakeConfig);
            db = new MongoDb(await Configuration.getConfiguration());
        });

        afterEach(() => {
            sinon.restore();
        });

        it('should close open connection', async () => {
            // arrange: beforeEach
            const fakeConnection = sinon.fake.resolves({ close: () => {}, isConnected: true });
            sinon.replace(MongoClient, 'connect', fakeConnection);
            const mongoCloseFake = sinon.fake.resolves({});

            const connection = await db.connect();
            sinon.replace(connection, 'close', mongoCloseFake);

            // act
            db.close(connection);

            // assert
            sinon.assert.called(mongoCloseFake);
        });

        it('should throw exception if connection is undefined', async () => {
            // arrange: beforeEach
            const closeSpy = sinon.spy(db, 'close');

            try {
                // act
                await db.close(undefined);

                // fail this unit test if close did not throw any exception.
                assert.fail('unit test failed');
            } catch (e) {
                // assert
                sinon.assert.called(closeSpy);
                sinon.assert.threw(closeSpy, 'MongoDb.close(): Invalid operation. Trying to close a non existant connection.');
            }
        });

        it('should throw exception if connection is defined but already closed', async () => {
            // arrange: beforeEach
            const fakeConnection = sinon.fake.resolves({ close: () => {}, isConnected: false });
            sinon.replace(MongoClient, 'connect', fakeConnection);
            const conn = await db.connect();

            try {
                // act
                await db.close(conn);

                // fail this unit test if close did not throw any exception.
                assert.fail('unit test failed');
            } catch (e) {
                // assert
                assert.equal(e, 'MongoDb.close(): Invalid operation. Trying to close a non existant connection.');
            }
        });
    });
});
