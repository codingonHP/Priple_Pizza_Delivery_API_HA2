import { IDbOperation } from '../contract/IDbOperation';
import { UserModel } from '../models/user.model';

export class UserBusiness {
    constructor(private db: IDbOperation) { }

    async saveUserAsync(user: UserModel): Promise<boolean> {
        const result = await this.db.addRecord(user);
        if (result) {
            return new Promise<boolean>((resolve) => { resolve(true); });
        }
        return new Promise<boolean>((resolve, reject) => { reject(false); });
    }

    async deleteUserAsync(id: string) {
        const result = await this.db.deleteRecord(id);
        if (result) {
            return new Promise<boolean>((resolve) => { resolve(true); });
        }
        return new Promise<boolean>((resolve, reject) => { reject(false); });
    }
}
