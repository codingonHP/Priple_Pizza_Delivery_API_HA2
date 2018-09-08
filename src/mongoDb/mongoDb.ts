import { MongoClient } from 'mongodb';
import { IDatabase } from '../contract/IDatabase';
import { Configuration } from '../configuration/Configuration';

export class MongoDb implements IDatabase {
    constructor(private config: Configuration) { }

    connect(): Promise<MongoClient> {
        const connString = `mongodb://${this.config.database.server}:${this.config.database.port}/${this.config.database.server}`;
        return MongoClient.connect(connString, { useNewUrlParser: true })
        .then((databaseConnection: MongoClient) => {
            return databaseConnection;
        },    (error) => {
            throw(error);
        })
        .catch((err) => {
            throw err;
        });
    }

    close(connection: MongoClient): Promise<void> {
        if (connection && connection.isConnected) {
            return connection.close();
        }

        throw('MongoDb.close(): Invalid operation. Trying to close a non existant connection.');
    }
}
