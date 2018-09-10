
import { ApiController } from './apiController';
import { HttpRequest } from '../core/server/httpRequest';
import { HttpResponse } from '../core/server/httpResponse';

export class NotFoundController extends ApiController {
    get(req: HttpRequest, res: HttpResponse): void {
        res.response.writeHead(404);
        res.response.end();
    }
}
