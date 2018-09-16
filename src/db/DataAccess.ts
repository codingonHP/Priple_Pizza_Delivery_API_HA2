import { IDbOperation } from '../contract/IDbOperation';
import { IDatabase } from '../contract/IDatabase';
import { MongoClient, ObjectId } from 'mongodb';
import { IConfiguration } from '../configuration/IConfiguration';

export class DataAccess implements IDbOperation {

    constructor(private configuration: IConfiguration, private database: IDatabase) {}

    addRecord(data: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const conn = <MongoClient>await this.database.connect();
            const db = conn.db(this.configuration.database.name);
            const userCollection = db.collection('user');
            userCollection.insertOne(data, (err, result) => {
                if (err) {
                    reject(err);
                    this.database.close(conn);
                    return;
                }

                resolve(result);
                this.database.close(conn);
            });
        });
    }

    updateRecord(id: string, data: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const conn = <MongoClient>await this.database.connect();
            const db = conn.db(this.configuration.database.name);
            db.collection('user').update({ _id: new ObjectId(id) }, data, (err, result) => {
                if (err) {
                    reject(err);
                    this.database.close(conn);
                    return;
                }

                resolve(result);
                this.database.close(conn);
            });
        });
    }

    deleteRecord(id: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const conn = <MongoClient>await this.database.connect();
            const db = conn.db(this.configuration.database.name);
            db.collection('user').deleteOne({ _id: new ObjectId(id) }, (err, result) => {
                if (err) {
                    reject(err);
                    this.database.close(conn);
                    return;
                }

                resolve(result);
                this.database.close(conn);
            });
        });
    }

}
