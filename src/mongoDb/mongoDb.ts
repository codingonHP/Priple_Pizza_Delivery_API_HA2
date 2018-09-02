import { MongoClient } from 'mongodb';
import { IDatabase } from '../contract/IDatabase';
import { Configuration } from '../configuration/Configuration';

export class MongoDb implements IDatabase {
    private connection: MongoClient;
    constructor(private config: Configuration) { }

    connect(): Promise<MongoClient> {
        return MongoClient.connect(this.config.database.server)
        .then((databaseConnection: MongoClient) => {
            this.connection = databaseConnection;
            return databaseConnection;
        },    (error) => {
            throw(error);
        })
        .catch((err) => {
            throw err;
        });
    }

    close(): Promise<void> {
        if (this.connection && this.connection.isConnected) {
            return this.connection.close();
        }

        throw('MongoDb.close(): Invalid operation. Trying to close a non existant connection.');
    }
}
