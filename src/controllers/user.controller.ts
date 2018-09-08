import { IncomingMessage, ServerResponse } from 'http';

import { ApiController } from './apiController';
import { UserBusiness } from '../business/user.business';
import { UserModel } from '../models/user.model';

export class UserController extends ApiController {
    constructor(private userBusiness: UserBusiness) {
        super();
    }

    async post(req: IncomingMessage, res: ServerResponse, data: UserModel): Promise<void> {
        await this.userBusiness.saveUserAsync(data);

        let body = '';
        req.on('data', (data) => {
            body += data;
            // request >= 1MB
            if (body.length >= 1e6) {
                // Flood attack
                req.connection.destroy();
                res.writeHead(413, { 'Content-Type': 'text/plain' });
                res.end();
            }
        });

        req.on('end', async () => {
            /* const postBody = querystring.parse(body);
            const config = await Configuration.getConfiguration();
            const userController = new UserController(new UserBusiness(new DataAccess(config, new MongoDb(config))));
            const userModel = new UserModel();
            userModel.name = <string>postBody.name;
            userModel.email = <string>postBody.email;
            userModel.address = <string>postBody.address;
            await userController.post(userModel);
            res.writeHead(200, { 'Content-Type': 'text/json' });
            res.end(JSON.stringify(postBody)); */
          });
    }
}
