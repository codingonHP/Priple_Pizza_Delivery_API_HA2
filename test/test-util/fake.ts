import { IDatabase } from '../../src/contract/IDatabase';
import { IConfiguration } from '../../src/configuration/IConfiguration';
import { DatabaseConfiguration } from '../../src/configuration/DatabaseConfiguration';

export class Fake {
    static getFakeDatabase(fakeDbImpl?: IDatabase): IDatabase {
        if (fakeDbImpl) {
            return fakeDbImpl;
        }
        return new FakeDatabase();
    }

    static getFakeConfiguration(fakeConfig?: IConfiguration) : IConfiguration {
        if (fakeConfig) {
            return fakeConfig;
        }
        return new FakeConfiguration();
    }
}

class FakeDatabase implements IDatabase {

    connect(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            resolve({ connected : true,
                    db: (db) => {
                        return {
                            collection: (collectionName) => {
                                return {
                                    insertOne: (record, cb) => {
                                        if (record) {
                                            cb(null, `${record.data} added to ${collectionName} collection in ${db} database`);
                                        } else {
                                            cb({ err: `failed to insert data` }, null);
                                        }
                                    },
                                };
                            },
                        };
                    },
                });
        });
    }

    close(connection: any): Promise<any> {
        return new Promise<any>((resolve, reject) => { resolve({ connected : false }); });
    }
}

class FakeConfiguration implements IConfiguration {
    database: DatabaseConfiguration = new DatabaseConfiguration();
    environment: string = '';

    constructor() {
        this.database.name = 'pizza';
        this.database.port = '1001';
        this.database.server = 'localhost';
    }
}

export class FakePromise {
    static resolve(data): Promise<any> {
        return new Promise((resolve) => {
            resolve(data);
        });
    }

    static reject(err): Promise<any> {
        return new Promise((resolve, reject) => {
            reject(err);
        });
    }
}
