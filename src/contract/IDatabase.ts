export interface IDatabase {
    connect(): Promise<any>;
    close(): Promise<any>;
}
