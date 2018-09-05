import { IDbOperation } from '../contract/IDbOperation';
import { IDatabase } from '../contract/IDatabase';
import { MongoClient } from 'mongodb';
import { IConfiguration } from '../configuration/IConfiguration';

export class DataAccess implements IDbOperation {

    constructor(private configuration: IConfiguration, private database: IDatabase) {}

    addRecord(data: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const conn = <MongoClient>await this.database.connect();
            const db = conn.db(this.configuration.database.name);
            const userCollection = db.collection('user');
            userCollection.insert(data, (err, result) => {
                if (err) {
                    reject(err); return;
                }

                resolve(result);
            });
        });
    }

}
