import { ApiController } from './apiController';
import { UserBusiness } from '../business/user.business';
import { UserModel } from '../models/user.model';
import { HttpRequest } from '../core/server/httpRequest';
import { HttpResponse } from '../core/server/httpResponse';
import { MongoDb } from '../mongoDb/mongoDb';
import { Configuration } from '../configuration/Configuration';
import { DataAccess } from '../db/DataAccess';

export class UserController extends ApiController {
    constructor() {
        super();
    }

    async post(req: HttpRequest, res: HttpResponse): Promise<void> {
        const config = await Configuration.getConfiguration();
        const userBusiness = new UserBusiness(new DataAccess(config, new MongoDb(config)));
        const userModel = new UserModel();
        userModel.name = <string>req.body.name;
        userModel.email = <string>req.body.email;
        userModel.address = <string>req.body.address;
        const saveResult = await userBusiness.saveUserAsync(userModel);
        if (saveResult) {
            this.created(res, JSON.stringify(userModel));
        } else {
            res.response.writeHead(500);
            res.response.end();
        }
    }
}
