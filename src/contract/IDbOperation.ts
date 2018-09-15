export interface IDbOperation {
    addRecord(data: any): Promise<any>;
    deleteRecord(id: string): Promise<any>;
}
