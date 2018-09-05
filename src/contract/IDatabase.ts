export interface IDatabase {
    connect(): Promise<any>;
    close(connection: any): Promise<any>;
}
