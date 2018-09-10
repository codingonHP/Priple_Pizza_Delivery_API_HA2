
import { ApiController } from './apiController';
import { HttpRequest } from '../core/server/httpRequest';
import { HttpResponse } from '../core/server/httpResponse';

export class ExceptionController extends ApiController {
    get(req: HttpRequest, res: HttpResponse): void {
        res.response.writeHead(500);
        res.response.end();
    }
}
