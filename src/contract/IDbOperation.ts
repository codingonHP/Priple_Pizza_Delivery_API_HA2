export interface IDbOperation {
    addRecord(data: any): Promise<any>;
    deleteRecord(id: string): Promise<any>;
    updateRecord(id: string, data: any): Promise<any>;
}
