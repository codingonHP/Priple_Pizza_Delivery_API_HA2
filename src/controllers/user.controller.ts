import { ApiController } from './apiController';
import { UserBusiness } from '../business/user.business';
import { UserModel } from '../models/user.model';
import { HttpRequest } from '../core/server/httpRequest';
import { HttpResponse } from '../core/server/httpResponse';
import { MongoDb } from '../mongoDb/mongoDb';
import { Configuration } from '../configuration/Configuration';
import { DataAccess } from '../db/DataAccess';

export class UserController extends ApiController {
    userBusiness: UserBusiness;
    constructor(config: Configuration) {
        super(config);
        this.userBusiness = new UserBusiness(new DataAccess(this.config, new MongoDb(this.config)));
    }

    async post(req: HttpRequest, res: HttpResponse): Promise<void> {
        const userModel = new UserModel();
        userModel.name = <string>req.body.name;
        userModel.email = <string>req.body.email;
        userModel.address = <string>req.body.address;
        const saveResult = await this.userBusiness.saveUserAsync(userModel);
        if (saveResult) {
            this.created(res, JSON.stringify(userModel));
        } else {
            res.response.writeHead(500);
            res.response.end();
        }
    }

    async put(req: HttpRequest, res: HttpResponse): Promise<void> {
        const id = <string>req.query.find(q => q.key === 'id').value;
        const userModel = new UserModel();
        userModel.name = <string>req.body.name;
        userModel.email = <string>req.body.email;
        userModel.address = <string>req.body.address;
        const updateResult = await this.userBusiness.updateUserAsync(id, userModel);
        if (updateResult) {
            this.created(res, JSON.stringify(userModel));
        } else {
            res.response.writeHead(500);
            res.response.end();
        }
    }

    async delete(req: HttpRequest, res: HttpResponse): Promise<void> {
        const id = <string>req.query.find(q => q.key === 'id').value;
        const deleteResult = await this.userBusiness.deleteUserAsync(id);
        if (deleteResult) {
            this.deleted(res);
        } else {
            res.response.writeHead(500);
            res.response.end();
        }
    }
}
